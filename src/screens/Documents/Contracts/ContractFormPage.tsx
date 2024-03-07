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
import { STATUS } from "enums/enums";
import useApp from "hooks/useApp";
import { ContractKeys, ContractNumKeys, ContractStrKeys, ContractRequiredKeys } from "models/documents/Contract";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { FileType } from "types/FileType";
import { IField } from "types/Forms/formFields";
import { ItemProps } from "types/ItemProps";
import { Project } from "types/Project";
import { allowEditActionBtn } from "utils/ActionsGuards";
import { getOptions } from "utils/GetOptions";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { useAuth } from "contexts/AuthContext";
import { contractInput, useCreateContract } from "api/Documents/Contracts/createContract";
import { useSaveContractToArchive } from "api/Documents/Contracts/archiveContract";
import { useContractDetailsQuery } from "api/Documents/Contracts/getContractDetails";
import { getFormattedTodayDate } from "utils/DateUtils";
import ConditionsCard from "components/Common/ConditionsCard";
import InstallmentsCard from "components/Common/InstallmentsCard";
import DefaultConditionsCard from "components/Common/DefaultConditionsCard";
import { DocumentFinances } from "types/DocumentFinances";
import DocumentProjectFinancesBox from "components/Common/DocumentProjectFinancesBox";
import { PrintInstallments } from "types/Print";
import { Contract } from "types/Contract";
import { Subcontractor } from "types/Subcontractor";
import { useSubcontractorsQuery } from "api/Subcontractors/getAllSubcontractors";
import { editContractInput, useEditContract } from "api/Documents/Contracts/editContract";
import { useCompanyDetailsQuery } from "api/Company/getCompany";

interface Props {
  id?: string;
}

const ContractFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // ------
  const [modelData, setModelData] = useState<Contract>({} as Contract);
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project);
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<Subcontractor>({} as Subcontractor);
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
  const { mutateAsync: editMutation } = useEditContract();
  const { mutateAsync: createMutation } = useCreateContract();
  const { mutateAsync: archiveMutation } = useSaveContractToArchive();
  // ------
  const { showError, showSuccess } = useUI();
  const { push } = useApp();
  const { session } = useAuth();

  const { data: documentData, error: documentError, isLoading: documentIsLoading } = useContractDetailsQuery({ id });
  const { data: companyData, error: companyError, isLoading: companyIsLoading } = useCompanyDetailsQuery({});
  const { data: projectsData, error: projectsError, isLoading: projectsIsLoading } = useProjectsQuery({});

  const {
    data: subcontractorsData,
    error: subcontractorsError,
    isLoading: subcontractorsIsLoading,
  } = useSubcontractorsQuery({});

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
    if (!initialized && projectsData && subcontractorsData && documentData) {
      let document: Contract = documentData?.contractDetails?.data!;
      let selectedProject: Project = document?.project;
      let selectedSubcontractor: Subcontractor = document?.subcontractor!;

      const initialModelData: Contract = {
        ...document!,
        project: selectedProject || ({} as Project),
        subcontractor: selectedSubcontractor || ({} as Subcontractor),
      };

      setModelData({ ...initialModelData });
      setSelectedProject(selectedProject || ({} as Project));
      setSelectedSubcontractor(selectedSubcontractor || ({} as Subcontractor));

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
  }, [documentData, subcontractorsData, projectsData, initialized]);

  const handleInitialModelData = () => {
    const company = companyData?.company?.data!;
    if (company) {
      modelData.company = company;
      setCompanyVatPercentage(Number(company.vat! || 0));
      setDefaultConditions(company.workFlow.default_contract_conditions);
    }
    modelData.date = `${getFormattedTodayDate()}`;
    modelData.description = `with reference to the above subject your quotation no XXXXX (rev.0) Dated on ${modelData.date ? getFormattedTodayDate() : "XXXXX"},`;
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
    (!id && subcontractorsIsLoading) ||
    (!id && companyIsLoading)
  )
    return <Loading />;
  if ((id && documentError) || (!id && projectsError) || (!id && subcontractorsError) || (!id && companyError))
    return null;

  let projects: Project[] = projectsData?.projects?.data || [];
  let subcontractors: Subcontractor[] = subcontractorsData?.subcontractors?.data || [];

  let projectsOptions = getOptions(projects, "Select Project");
  let subcontractorsOptions = subcontractors.map((subcontractor) => {
    return {
      label:
        subcontractor.name +
        " - " +
        subcontractor.company_name +
        " - " +
        subcontractor.country +
        ", " +
        subcontractor.city,
      value: subcontractor.id,
    };
  });

  // Modals Handling
  const handleOpenPreviewModal = () => {
    setModalHeader("Preview Contract");
    setIsPreviewModal(true);
  };

  const handleModelData = (key: string, value: any) => {
    if (key === ContractKeys.PROJECT) {
      value = projects.find((project) => project.id === value!) || null;
      setSelectedProject(value ? value : ({} as Project));
    }
    if (key === ContractKeys.SUB_CONTRACTOR) {
      value = subcontractors.find((subcontractor) => subcontractor.id === value!) || null;
      setSelectedSubcontractor(value ? value : ({} as Subcontractor));
    }
    if (key === ContractKeys.FILES) {
      setFilesNameSet([...filesNameSet, value.name]);
      let newFilesArray: File[] = [...files, value];
      value = newFilesArray;
      setFiles(newFilesArray);
    }
    if (key === "items") {
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
    setDefaultConditions(modelData.company?.workFlow?.default_contract_conditions! || [""]);
    setFiles([]);
    setFilesNameSet([]);
    setSubTotalAmount(0);
    setSelectedProject({} as Project);

    setModelData({
      ...modelData,
      subject: "",
      date: "",
      project: {} as Project,
      subcontractor: {} as Subcontractor,
      description: `with reference to the above subject your quotation no XXXXX (rev.0) Dated on XXXXX,`,
      files: [],
    });
  };

  // Modal Inputs Data
  const formFields: IField[] = [
    {
      label: "Subject",
      type: "text",
      width: "col-md-6",
      key: ContractKeys.SUBJECT,
      value: modelData?.subject,
      onChange: (value: string) => handleModelData(ContractKeys.SUBJECT, value),
      placeholder: "Enter Request Subject",
      required: true,
    },
    {
      label: "Date",
      type: "date",
      width: "col-md-6",
      key: ContractKeys.DATE,
      value: modelData?.date,
      onChange: (value: any) => handleModelData(ContractKeys.DATE, value),
      placeholder: "",
      required: true,
    },
    {
      label: "Project",
      type: "select",
      width: "col-md-6",
      key: ContractKeys.PROJECT,
      value: selectedProject?.name!,
      onChange: (value: any) => {
        handleModelData(ContractKeys.PROJECT, value);
      },
      options: projectsOptions,
      placeholder: "Select Project",
      required: true,
    },
    {
      label: "Subcontractor",
      type: "select",
      width: "col-md-6",
      key: ContractKeys.SUB_CONTRACTOR,
      value: selectedSubcontractor?.name!,
      onChange: (value: any) => handleModelData(ContractKeys.SUB_CONTRACTOR, value),
      options: subcontractorsOptions,
      placeholder: "Select Subcontractor",
      required: true,
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: ContractKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string) => handleModelData(ContractKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      default: `with reference to the above subject your quotation no XXXXX (rev.0) Dated on XXXXX,`,
      required: true,
    },
    {
      label: "Files To Upload",
      type: "file",
      width: "col-md-12",
      key: ContractKeys.FILES,
      value: modelData?.files,
      onChange: (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          let file: File = e.target?.files[0]!;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (url) => {
            handleModelData(ContractKeys.FILES, file);
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

      handleModelData(ContractKeys.ITEMS, updatedItems);
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

      handleModelData(ContractKeys.ITEMS, updatedItems);
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
    if (term === ContractKeys.INSTALLMENTS) setInstallments(value);
    if (term === ContractKeys.PAYMENT_TYPE) setPaymentType(value);
  };

  const handleDefaultConditionsChange = (value: any) => {
    setDefaultConditions(value);
  };

  // MAIN FUNCTIONS
  const handleCreateRequest = async () => {
    let numbersToValidate = ContractNumKeys;
    let stringsToValidate = ContractStrKeys;
    let requiredToValidate = ContractRequiredKeys;

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
        createInput = contractInput({
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
        createInput = contractInput({
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
      let numbersToValidate = ContractNumKeys;
      let stringsToValidate = ContractStrKeys;
      let requiredToValidate = ContractRequiredKeys;

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
        createInput = editContractInput({
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
        createInput = editContractInput({
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
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = contractInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          files,
          items: stringItems,
          filesNameSet: stringAddedFiles,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
        });
      } else {
        createInput = contractInput({
          ...modelData,
          sub_total: subTotalAmount,
          vat: vatAmount,
          discount: Number(discountAmount),
          total: totalAmount,
          items: stringItems,
          conditions: stringConditions,
          default_conditions: stringDefaultConditions,
        });
      }
      await archiveMutation({
        data: createInput,
        projectId: selectedProject?.id,
      });
      push("/" + PAGES.CONTRACTS);
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
            budget={selectedProject?.subcontractor_budget! ? Number(selectedProject?.subcontractor_budget!) : 0}
            expenses={selectedProject?.subcontractor_expenses! ? Number(selectedProject?.subcontractor_expenses!) : 0}
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
                documentData?.contractDetails?.data?.user?.id!,
                documentData?.contractDetails?.data!,
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
          documentType={"contract"}
        />
      </div>
    </div>
  );
};

export default ContractFormPage;
