import ItemsCard from "components/Common/ItemsCard";
import NewFiles from "components/Common/NewFiles";
import OldFiles from "components/Common/OldFiles";
import { useProjectsQuery } from "api/Projects/getAllProjects";
import PageHeader from "components/Common/PageHeader";
import DocumentPreviewModal from "components/Modals/DocumentPreviewModal";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { DOCUMENT_TYPE, STATUS } from "enums/enums";
import useApp from "hooks/useApp";
import { PoRequestKeys, PoRequestNumKeys, PoRequestStrKeys, PoRequestRequiredKeys } from "models/documents/PoRequest";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { FileType } from "types/FileType";
import { IField } from "types/Forms/formFields";
import { ItemProps } from "types/ItemProps";
import { PurchaseOrderRequest } from "types/Po_request";
import { Project } from "types/Project";
import { allowEditActionBtn } from "utils/ActionsGuards";
import { getOptions } from "utils/GetOptions";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { useAuth } from "contexts/AuthContext";
import { poRequestInput, useCreatePoRequest } from "api/Documents/PoRequests/createPoRequest";
import { useSavePoRequestToArchive } from "api/Documents/PoRequests/archivePoRequest";
import { useSuppliersQuery } from "api/Suppliers/getAllSuppliers";
import { usePoRequestDetailsQuery } from "api/Documents/PoRequests/getPoRequestDetails";
import { Supplier } from "types/Supplier";
import { getFormattedTodayDate } from "utils/DateUtils";
import ConditionsCard from "components/Common/ConditionsCard";
import InstallmentsCard from "components/Common/InstallmentsCard";
import DefaultConditionsCard from "components/Common/DefaultConditionsCard";
import { DocumentFinances } from "types/DocumentFinances";
import { poEditInput, useEditPoRequest } from "api/Documents/PoRequests/editPoRequest";
import { useCompanyDetailsQuery } from "api/Company/getCompany";
import DocumentProjectFinancesBox from "components/Common/DocumentProjectFinancesBox";
import { PrintInstallments } from "types/Print";

interface Props {
  id?: string;
}

const PoFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // ------
  const [modelData, setModelData] = useState<PurchaseOrderRequest>({} as PurchaseOrderRequest);
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier>({} as Supplier);
  // ------
  const [modalHeader, setModalHeader] = useState<string>("");
  const [isPreviewModal, setIsPreviewModal] = useState<boolean>(false);
  // ------
  const [defaultConditions, setDefaultConditions] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([""]);
  const [items, setItems] = useState<ItemProps[]>([{ description: "", item: "", count: "", price: "", total: "" }]);
  const [installments, setInstallments] = useState<PrintInstallments[]>([
    { name: "", percentage: 0, value: 0, details: "", date: "" },
  ]);
  // ------
  const [files, setFiles] = useState<File[]>([]);
  const [filesNameSet, setFilesNameSet] = useState<string[]>([]);
  const [oldFiles, setOldFiles] = useState<FileType[]>([]);
  const [removedFilesNameSet, setRemovedFilesNameSet] = useState<string[]>([]);
  // ------
  const [companyVatPercentage, setCompanyVatPercentage] = useState<number>(0);
  const [subTotalAmount, setSubTotalAmount] = useState<number>(0);
  const [vatAmount, setVatAmount] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [documentFinancesObj, setDocumentFinancesObj] = useState<DocumentFinances>({} as DocumentFinances);
  const [includeVat, setIncludeVat] = useState<boolean>(true);
  const [paymentType, setPaymentType] = useState<string>("cash");
  // ------
  const { mutateAsync: editMutation } = useEditPoRequest();
  const { mutateAsync: createMutation } = useCreatePoRequest();
  const { mutateAsync: archiveMutation } = useSavePoRequestToArchive();
  // ------
  const { showError, showSuccess } = useUI();
  const { push } = useApp();
  const { session } = useAuth();

  const { data: documentData, error: documentError, isLoading: documentIsLoading } = usePoRequestDetailsQuery({ id });
  const { data: companyData, error: companyError, isLoading: companyIsLoading } = useCompanyDetailsQuery({});
  const { data: projectsData, error: projectsError, isLoading: projectsIsLoading } = useProjectsQuery({});
  const { data: suppliersData, error: suppliersError, isLoading: suppliersIsLoading } = useSuppliersQuery({});

  // !Check if this is CREATE OR EDIT Modal
  useEffect(() => {
    if (!initialized) {
      if (id) setIsEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // !Assuming this is CREATE Modal
  useEffect(() => {
    if (session && companyData?.company?.data && !isEdit) {
      handleInitialModelData();
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && projectsData && suppliersData && documentData) {
      let document: PurchaseOrderRequest = documentData?.poRequestDetails?.data!;
      let selectedProject: Project = document?.project;
      let selectedSupplier: Supplier = document?.supplier;

      const initialModelData: PurchaseOrderRequest = {
        ...document!,
        project: selectedProject || ({} as Project),
        supplier: selectedSupplier || ({} as Supplier),
      };

      setModelData({ ...initialModelData });
      setSelectedProject(selectedProject || ({} as Project));
      setSelectedSupplier(selectedSupplier || ({} as Supplier));

      let selectedItems: ItemProps[] = document?.items! || ([] as ItemProps[]);
      let selectedFiles: FileType[] = document?.files! || ([] as FileType[]);
      let selectedConditions: string[] = document?.conditions! || [];
      let selectedInstallments: PrintInstallments[] = document?.installments || ([] as PrintInstallments[]);

      setItems(selectedItems);
      setOldFiles(selectedFiles);
      setInstallments(selectedInstallments);
      setConditions(selectedConditions);
      // -----
      setCompanyVatPercentage(document?.vat_percentage!);
      setSubTotalAmount(document?.sub_total!);
      setVatAmount(document?.vat!);
      setDiscountAmount(String(document?.discount!));
      setTotalAmount(document?.total!);
      setPaymentType(document?.payment_type!);

      handleFinanceChange();
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentData, suppliersData, projectsData, initialized]);

  const handleInitialModelData = () => {
    const company = companyData?.company?.data!;
    if (company) {
      modelData.company = company;
      setCompanyVatPercentage(Number(company.vat! || 0));
      setDefaultConditions(company.workFlow.default_po_conditions);
    }
    modelData.date = `${getFormattedTodayDate()}`;
    modelData.delivery_date = `${getFormattedTodayDate()}`;
    modelData.description = `with reference to the above subject your quotation no XXXXX (rev.0) Dated on ${modelData.date ? getFormattedTodayDate() : "XXXXX"},
we would like to place the purchase order for Below Items.`;
  };

  const handleFinanceChange = () => {
    let vatAmount = (Number(subTotalAmount) / 100) * Number(companyVatPercentage);
    let totalAmount = Number(subTotalAmount) + Number(vatAmount) - Number(discountAmount);
    setVatAmount(vatAmount);
    setTotalAmount(totalAmount);
    let financesObj = {
      modelSubTotal: subTotalAmount,
      modelTotal: totalAmount,
      modelTotalDiscount: Number(discountAmount),
      modelTotalVat: vatAmount,
      modelVatPercentage: companyVatPercentage,
    };
    setDocumentFinancesObj(financesObj);
  };

  useEffect(() => {
    handleFinanceChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTotalAmount, includeVat, discountAmount]);

  if (
    (id && documentIsLoading) ||
    (!id && projectsIsLoading) ||
    (!id && suppliersIsLoading) ||
    (!id && companyIsLoading)
  )
    return <Loading />;
  if ((id && documentError) || (!id && projectsError) || (!id && suppliersError) || (!id && companyError)) return null;

  let projects: Project[] = projectsData?.projects?.data || [];
  let suppliers: Supplier[] = suppliersData?.suppliers?.data || [];

  let projectsOptions = getOptions(projects, "Select Project");
  let suppliersOptions = suppliers.map((supplier) => {
    return {
      label: supplier.name + " - " + supplier.company_name + " - " + supplier.country + ", " + supplier.city,
      value: supplier.id,
    };
  });

  suppliersOptions.unshift({ label: "Select Supplier", value: "0" });

  // Modals Handling
  const handleOpenPreviewModal = () => {
    setModalHeader("Preview Purchase Order Request");
    modelData.type = DOCUMENT_TYPE.PURCHASE_ORDER;
    modelData.installments = installments;
    setIsPreviewModal(true);
  };

  const handleModelData = (key: string, value: any) => {
    if (key === PoRequestKeys.PROJECT) {
      value = projects.find((project) => project.id === value!) || null;
      setSelectedProject(value ? value : ({} as Project));
    }
    if (key === PoRequestKeys.SUPPLIER) {
      value = suppliers.find((supplier) => supplier.id === value!) || null;
      setSelectedSupplier(value ? value : ({} as Supplier));
    }
    if (key === PoRequestKeys.FILES) {
      setFilesNameSet([...filesNameSet, value.name]);
      let newFilesArray: File[] = [...files, value];
      value = newFilesArray;
      setFiles(newFilesArray);
    }
    if (key === PoRequestKeys.ITEMS) {
      setModelData({
        ...modelData,
        total: totalAmount,
      });
    }
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleReset = () => {
    setItems([{ description: "", item: "", count: "", price: "", total: 0 }]);
    setConditions([""]);
    setDefaultConditions(modelData.company?.workFlow?.default_po_conditions! || [""]);
    setFiles([]);
    setFilesNameSet([]);
    setSubTotalAmount(0);
    setSelectedProject({} as Project);

    setModelData({
      ...modelData,
      subject: "",
      date: "",
      project: {} as Project,
      supplier: {} as Supplier,
      material_availability: "",
      transportation: "",
      delivery_date: "",
      description: `with reference to the above subject your quotation no XXXXX (rev.0) Dated on XXXXX,
we would like to place the purchase order for Below Items.`,
      files: [],
    });
  };

  // Modal Inputs Data
  const formFields: IField[] = [
    {
      label: "Subject",
      type: "text",
      width: "col-md-6",
      key: PoRequestKeys.SUBJECT,
      value: modelData?.subject,
      onChange: (value: string) => handleModelData(PoRequestKeys.SUBJECT, value),
      placeholder: "Enter Request Subject",
      required: true,
    },
    {
      label: "Date",
      type: "date",
      width: "col-md-6",
      key: PoRequestKeys.DATE,
      value: modelData?.date,
      onChange: (value: any) => handleModelData(PoRequestKeys.DATE, value),
      placeholder: "",
      required: true,
    },
    {
      label: "Project",
      type: "select",
      width: "col-md-6",
      key: PoRequestKeys.PROJECT,
      value: selectedProject?.name!,
      onChange: (value: any) => {
        handleModelData(PoRequestKeys.PROJECT, value);
      },
      options: projectsOptions,
      placeholder: "Select Project",
      required: true,
    },
    {
      label: "Supplier",
      type: "select",
      width: "col-md-6",
      key: PoRequestKeys.SUPPLIER,
      value: selectedSupplier?.name!,
      onChange: (value: any) => handleModelData(PoRequestKeys.SUPPLIER, value),
      options: suppliersOptions,
      placeholder: "Select Supplier",
      required: true,
    },
    {
      label: "Material Availability",
      type: "text",
      width: "col-md-4",
      key: PoRequestKeys.AVAILABILITY,
      value: modelData?.material_availability,
      onChange: (value: string) => handleModelData(PoRequestKeys.AVAILABILITY, value),
      placeholder: "Enter Material Availability",
      required: true,
    },
    {
      label: "Transportation",
      type: "text",
      width: "col-md-4",
      key: PoRequestKeys.TRANSPORTATION,
      value: modelData?.transportation,
      onChange: (value: string) => handleModelData(PoRequestKeys.TRANSPORTATION, value),
      placeholder: "Enter Transportation",
      required: true,
    },
    {
      label: "Delivery Date",
      type: "date",
      width: "col-md-4",
      key: PoRequestKeys.DELIVERY_DATE,
      value: modelData?.delivery_date,
      onChange: (value: any) => handleModelData(PoRequestKeys.DELIVERY_DATE, value),
      placeholder: "",
      required: true,
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: PoRequestKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string) => handleModelData(PoRequestKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      default: `with reference to the above subject your quotation no XXXXX (rev.0) Dated on XXXXX,
we would like to place the purchase order for Below Items.`,
      required: true,
    },
    {
      label: "Files To Upload",
      type: "file",
      width: "col-md-12",
      key: PoRequestKeys.FILES,
      value: modelData?.files,
      onChange: (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          let file: File = e.target?.files[0]!;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (url) => {
            handleModelData(PoRequestKeys.FILES, file);
          };
        }
      },
    },
  ];

  // FILES
  const handleRemoveOldFile = (file: FileType) => {
    if (file.state === undefined || file.state === false) {
      const selectedFile: FileType | undefined = oldFiles.find(
        (selectedFileToAdd: FileType) => selectedFileToAdd.name === file.name,
      );
      if (selectedFile) {
        const updatedFiles = oldFiles.map((oldFile: FileType) =>
          oldFile.name === file.name ? { ...oldFile, state: true } : oldFile,
        );
        setOldFiles(updatedFiles);
        setRemovedFilesNameSet((prevSet) => prevSet.filter((selectedFile) => selectedFile !== file.name));
      }
    } else {
      const filteredFilesArr: FileType[] = oldFiles.filter((selectedFile: FileType) => selectedFile.name !== file.name);
      setOldFiles([...filteredFilesArr, { ...file, state: false }]);
      setRemovedFilesNameSet((prevSet) => (prevSet.includes(file.name) ? prevSet : [...prevSet, file.name]));
    }
  };

  const handleRemoveNewFile = (file: File) => {
    setFilesNameSet(filesNameSet.filter((selectedFile) => selectedFile !== file.name));
    let newFilesArray: File[] = files.filter((selectedFile: File) => selectedFile.name !== file.name);
    setFiles(newFilesArray);
  };

  // ITEMS SECTION
  const handleItemChange = (index: number, prop: keyof ItemProps, value: string) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [prop]: value };

      if ((prop === "count" || prop === "price") && value !== "") {
        updatedItems[index] = { ...updatedItems[index], total: 0 };
      }

      let price = Number(updatedItems[index].price);
      let count = Number(updatedItems[index].count);
      if (price && price > 0 && count && count > 0) {
        let total = price * count;
        updatedItems[index] = { ...updatedItems[index], total };
      }

      let allItemsTotal = updatedItems.reduce((total, item) => {
        let price = Number(item.price);
        let count = Number(item.count);
        if (price && price > 0 && count && count > 0) {
          return total + price * count;
        }
        return total;
      }, 0);

      handleModelData(PoRequestKeys.ITEMS, updatedItems);
      setSubTotalAmount(allItemsTotal);
      return updatedItems;
    });
  };

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, { description: "", item: "", count: "", price: "", total: "0" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);

      let allItemsTotal = updatedItems.reduce((total, item) => {
        let price = Number(item.price);
        let count = Number(item.count);
        if (price && price > 0 && count && count > 0) {
          return total + price * count;
        }
        return total;
      }, 0);

      handleModelData(PoRequestKeys.ITEMS, updatedItems);
      setSubTotalAmount(allItemsTotal);

      return updatedItems;
    });
  };

  // CONDITIONS SECTION
  const handleConditionChange = (index: number, value: string) => {
    setConditions((prevConditions) => {
      const updatedConditions = [...prevConditions];
      updatedConditions[index] = value;
      return updatedConditions;
    });
  };

  const handleAddCondition = () => {
    setConditions((prevConditions) => [...prevConditions, ""]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions((prevConditions) => {
      const updatedConditions = [...prevConditions];
      updatedConditions.splice(index, 1);
      return updatedConditions;
    });
  };

  // Vat
  const handleVatToggle = (isInclude: boolean) => {
    setIncludeVat(isInclude);
    if (!isInclude) {
      setCompanyVatPercentage(0);
    } else {
      setCompanyVatPercentage(session?.company?.vat! || 0);
    }
  };

  const handleInstallmentsChange = (term: string, value: any) => {
    if (term === PoRequestKeys.INSTALLMENTS) setInstallments(value);
    if (term === PoRequestKeys.PAYMENT_TYPE) setPaymentType(value);
  };

  const handleDefaultConditionsChange = (value: any) => {
    setDefaultConditions(value);
  };

  // MAIN FUNCTIONS
  const handleCreateRequest = async () => {
    let numbersToValidate = PoRequestNumKeys;
    let stringsToValidate = PoRequestStrKeys;
    let requiredToValidate = PoRequestRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput;
      let stringItems = JSON.stringify(items);
      let filteredConditions = conditions.filter((condition) => condition !== "");
      let filteredDefaultConditions = defaultConditions.filter((condition) => condition !== "");
      let stringConditions = JSON.stringify(filteredConditions);
      let stringDefaultConditions = JSON.stringify(filteredDefaultConditions);
      let stringInstallments = JSON.stringify(installments);
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = poRequestInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          payment_type: paymentType,
          files,
          items: stringItems,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
          installments: stringInstallments,
          filesNameSet: stringAddedFiles,
          projectId: selectedProject?.id!,
        });
      } else {
        createInput = poRequestInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          payment_type: paymentType,
          items: stringItems,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
          installments: stringInstallments,
          projectId: selectedProject?.id!,
        });
      }
      await createMutation(createInput);
      push("/" + PAGES.PO_REQUESTS);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEditRequest = async (toArchive = false) => {
    if (toArchive === false) {
      let numbersToValidate = PoRequestNumKeys;
      let stringsToValidate = PoRequestStrKeys;
      let requiredToValidate = PoRequestRequiredKeys;

      const validationData: inputsValidationType = {
        requiredToValidate,
        numbersToValidate,
        stringsToValidate,
        inputs: modelData,
      };

      let errors = validateInputs(validationData);
      if (errors.length > 0) return showError(errors);
    }

    try {
      let createInput;
      let stringItems = JSON.stringify(items);
      let filteredConditions = conditions.filter((condition) => condition !== "");
      let filteredDefaultConditions = defaultConditions.filter((condition) => condition !== "");
      let stringConditions = JSON.stringify(filteredConditions);
      let stringDefaultConditions = JSON.stringify(filteredDefaultConditions);
      let stringInstallments = JSON.stringify(installments);
      let stringRemovedFiles = JSON.stringify(removedFilesNameSet);
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = poEditInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          payment_type: paymentType,
          files,
          items: stringItems,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
          installments: stringInstallments,
          removedFilesNameSet: stringRemovedFiles,
          addedFilesNameSet: stringAddedFiles,
          is_archived: toArchive === true ? true : false,
        });
      } else {
        createInput = poEditInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          payment_type: paymentType,
          items: stringItems,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
          installments: stringInstallments,
          removedFilesNameSet: stringRemovedFiles,
          addedFilesNameSet: stringAddedFiles,
          is_archived: toArchive === true ? true : false,
        });
      }
      await editMutation({ data: createInput, id });
      push("/" + PAGES.PO_REQUESTS);
      showSuccess();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleEdit = () => {
    if (modelData.status === STATUS.ARCHIVED) {
      handleEditRequest(true);
    } else {
      handleEditRequest(false);
    }
  };

  const handleSaveRequestToArchive = async () => {
    try {
      let createInput;
      let stringItems = JSON.stringify(items);
      let filteredConditions = conditions.filter((condition) => condition !== "");
      let filteredDefaultConditions = defaultConditions.filter((condition) => condition !== "");
      let stringConditions = JSON.stringify(filteredConditions);
      let stringDefaultConditions = JSON.stringify(filteredDefaultConditions);
      let stringInstallments = JSON.stringify(installments);
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = poRequestInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          payment_type: paymentType,
          files,
          items: stringItems,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
          installments: stringInstallments,
          filesNameSet: stringAddedFiles,
          projectId: selectedProject?.id!,
        });
      } else {
        createInput = poRequestInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          payment_type: paymentType,
          items: stringItems,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
          installments: stringInstallments,
          projectId: selectedProject?.id!,
        });
      }
      await archiveMutation(createInput);
      push("/" + PAGES.PO_REQUESTS);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  if (!initialized) return <></>;
  return (
    <div className="container-xxl">
      <PageHeader headerTitle={""} isBtnShow={false} btnText={""} isBackBtn={true} />
      <div className="row g-3 pb-3 pb-xl-0">
        <div>
          <DocumentProjectFinancesBox
            budget={selectedProject?.po_budget! ? Number(selectedProject?.po_budget!) : 0}
            expenses={selectedProject?.po_expenses! ? Number(selectedProject?.po_expenses!) : 0}
            documentTotal={Number(totalAmount)}
          />
          <FormInputs formFields={formFields} grid={true} block={true} />
          <div className="d-flex flex-row justify-content-start align-items-start overflow-x-scroll pb-1">
            <OldFiles files={oldFiles} onRemove={handleRemoveOldFile} />
            <NewFiles files={files} onRemove={handleRemoveNewFile} />
          </div>
          {!isEdit && defaultConditions.length !== 0 ? (
            <DefaultConditionsCard defaultConditions={defaultConditions} onChange={handleDefaultConditionsChange} />
          ) : null}
          <ConditionsCard
            conditions={conditions}
            onAddCondition={handleAddCondition}
            onEdit={handleConditionChange}
            onRemove={handleRemoveCondition}
          />
          <ItemsCard
            items={items}
            finances={documentFinancesObj}
            isVat={includeVat}
            toggleVat={handleVatToggle}
            onChangeDiscount={setDiscountAmount}
            onChangeItem={handleItemChange}
            onRemoveItem={handleRemoveItem}
            onAddItem={handleAddItem}
          />
          <InstallmentsCard
            total={totalAmount}
            onChange={handleInstallmentsChange}
            initialInstallments={installments}
            initialPaymentType={paymentType}
          />
        </div>
        {/* End Of Preview & Print Modal  */}
        <div className="col-sm d-flex align-items-center justify-content-center gap-2">
          {isEdit ? (
            <>
              <Button
                className="lift"
                content="Cancel"
                onClick={() => push("/" + PAGES.SITE_REQUESTS)}
                variant="secondary"
              />
            </>
          ) : (
            <>
              <Button className="lift" content="Reset" onClick={handleReset} variant="secondary" />
            </>
          )}
          {isEdit ? (
            <>
              {allowEditActionBtn(
                documentData?.poRequestDetails?.data?.user?.id!,
                documentData?.poRequestDetails?.data!,
              ) && <Button className="lift" content="Edit" onClick={handleEdit} />}
            </>
          ) : (
            <>
              <Button className="lift" content="Create" onClick={handleCreateRequest} />
            </>
          )}
          <Button className="lift" content="Preview" onClick={handleOpenPreviewModal} />
          {isEdit ? (
            <>
              {modelData.status === STATUS.ARCHIVED && (
                <Button className="lift" content="Activate" onClick={() => handleEditRequest(false)} />
              )}
            </>
          ) : (
            <>
              <Button className="lift" content="Save To Archive" onClick={handleSaveRequestToArchive} />
            </>
          )}
        </div>
        <DocumentPreviewModal
          onClose={() => setIsPreviewModal(false)}
          isModal={isPreviewModal}
          modalHeader={modalHeader}
          modelData={modelData}
          documentFinances={documentFinancesObj}
          documentType={"po"}
        />
      </div>
    </div>
  );
};

export default PoFormPage;
