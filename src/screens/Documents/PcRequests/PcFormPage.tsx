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
import { PcRequestKeys, PcRequestNumKeys, PcRequestStrKeys, PcRequestRequiredKeys } from "models/documents/PcRequest";
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
import { pcRequestInput, useCreatePcRequest } from "api/Documents/PcRequests/createPcRequest";
import { getFormattedTodayDate } from "utils/DateUtils";
import { DocumentFinances } from "types/DocumentFinances";
import DocumentProjectFinancesBox from "components/Common/DocumentProjectFinancesBox";
import { PettyCashRequest } from "types/Pc_request";
import { usePcRequestDetailsQuery } from "api/Documents/PcRequests/getPcRequestDetails";
import { pcEditInput, useEditPcRequest } from "api/Documents/PcRequests/editPcRequest";
import { useSavePcRequestToArchive } from "api/Documents/PcRequests/archivePcRequest";
import { useCompanyDetailsQuery } from "api/Company/getCompany";

interface Props {
  id?: string;
}

const PcFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // ------
  const [modelData, setModelData] = useState<PettyCashRequest>({} as PettyCashRequest);
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project);
  // ------
  const [modalHeader, setModalHeader] = useState<string>("");
  const [isPreviewModal, setIsPreviewModal] = useState<boolean>(false);
  // ------
  const [items, setItems] = useState<ItemProps[]>([{ description: "", item: "", count: "", price: "", total: "" }]);
  // ------
  const [files, setFiles] = useState<File[]>([]);
  const [filesNameSet, setFilesNameSet] = useState<string[]>([]);
  const [oldFiles, setOldFiles] = useState<FileType[]>([]);
  const [removedFilesNameSet, setRemovedFilesNameSet] = useState<string[]>([]);
  // ------
  const [companyVatPercentage, setCompanyVatPercentage] = useState<number>(0);
  const [subTotalAmount, setSubTotalAmount] = useState<number>(0);
  const [vatAmount, setVatAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [documentFinancesObj, setDocumentFinancesObj] = useState<DocumentFinances>({} as DocumentFinances);
  const [includeVat, setIncludeVat] = useState<boolean>(true);
  // ------
  const { mutateAsync: editMutation } = useEditPcRequest();
  const { mutateAsync: createMutation } = useCreatePcRequest();
  const { mutateAsync: archiveMutation } = useSavePcRequestToArchive();
  // ------
  const { showError, showSuccess } = useUI();
  const { push } = useApp();
  const { session } = useAuth();

  const { data: documentData, error: documentError, isLoading: documentIsLoading } = usePcRequestDetailsQuery({ id });
  const { data: companyData, error: companyError, isLoading: companyIsLoading } = useCompanyDetailsQuery({});
  const { data: projectsData, error: projectsError, isLoading: projectsIsLoading } = useProjectsQuery({});

  // !Check if this is CREATE OR EDIT Modal
  useEffect(() => {
    if (!initialized) {
      if (id) setIsEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // !Assuming this is CREATE Modal
  useEffect(() => {
    if (!isEdit && !initialized) {
      handleInitialModelData();
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && projectsData && documentData) {
      let document: PettyCashRequest = documentData?.pcRequestDetails?.data!;

      setModelData(document);
      setSelectedProject(document.project || ({} as Project));

      let selectedItems: ItemProps[] = document?.items! || ([] as ItemProps[]);
      let selectedFiles: FileType[] = document?.files! || ([] as FileType[]);

      setItems(selectedItems);
      setOldFiles(selectedFiles);
      setTotalAmount(document?.total!);

      handleFinanceChange();
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentData, projectsData, initialized]);

  const handleInitialModelData = () => {
    const company = companyData?.company?.data!;
    if (company) {
      modelData.company = company;
      setCompanyVatPercentage(Number(company.vat! || 0));
    }
    modelData.date = `${getFormattedTodayDate()}`;
    modelData.description = `No description.`;
  };

  const handleFinanceChange = () => {
    let vatAmount = (Number(subTotalAmount) / 100) * Number(companyVatPercentage);
    let totalAmount = Number(subTotalAmount) + Number(vatAmount);
    setVatAmount(vatAmount);
    setTotalAmount(totalAmount);
    let financesObj = {
      modelSubTotal: subTotalAmount,
      modelTotal: totalAmount,
      modelTotalDiscount: 0,
      modelTotalVat: vatAmount,
      modelVatPercentage: companyVatPercentage,
    };
    setDocumentFinancesObj(financesObj);
  };

  useEffect(() => {
    handleFinanceChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTotalAmount, includeVat]);

  if ((id && documentIsLoading) || (!id && projectsIsLoading) || (!id && companyIsLoading)) return <Loading />;
  if ((id && documentError) || (!id && projectsError) || (!id && companyError)) return null;

  let projects: Project[] = projectsData?.projects?.data || [];
  let projectsOptions = getOptions(projects, "Select Project");

  // Modals Handling
  const handleOpenPreviewModal = () => {
    setModalHeader("Preview Petty Order Request");
    modelData.type = DOCUMENT_TYPE.PETTY_CASH;
    setIsPreviewModal(true);
  };

  const handleModelData = (key: string, value: any) => {
    if (key === PcRequestKeys.PROJECT) {
      let sProject = projects.find((project) => project.id === value!) || null;
      setSelectedProject(sProject ? sProject : ({} as Project));
    }
    if (key === PcRequestKeys.FILES) {
      setFilesNameSet([...filesNameSet, value.name]);
      let newFilesArray: File[] = [...files, value];
      value = newFilesArray;
      setFiles(newFilesArray);
    }
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleReset = () => {
    setItems([{ description: "", item: "", count: "", price: "", total: 0 }]);
    setFiles([]);
    setFilesNameSet([]);
    setSubTotalAmount(0);
    setSelectedProject({} as Project);

    setModelData({
      ...modelData,
      subject: "",
      date: "",
      project: {} as Project,
      description: "",
      files: [],
    });
  };

  // Modal Inputs Data
  const formFields: IField[] = [
    {
      label: "Subject",
      type: "text",
      width: "col-md-4",
      key: PcRequestKeys.SUBJECT,
      value: modelData?.subject,
      onChange: (value: string) => handleModelData(PcRequestKeys.SUBJECT, value),
      placeholder: "Enter Request Subject",
      required: true,
    },
    {
      label: "Project",
      type: "select",
      width: "col-md-4",
      key: PcRequestKeys.PROJECT,
      value: selectedProject?.id!,
      onChange: (value: string | any) => {
        handleModelData(PcRequestKeys.PROJECT, value);
      },
      options: projectsOptions,
      placeholder: "Select Project",
      required: true,
    },
    {
      label: "Date",
      type: "date",
      width: "col-md-4",
      key: PcRequestKeys.DATE,
      value: modelData?.date,
      onChange: (value: string | any) => handleModelData(PcRequestKeys.DATE, value),
      placeholder: "",
      required: true,
      default: `${getFormattedTodayDate()}`,
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: PcRequestKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string | any) => handleModelData(PcRequestKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
    },
    {
      label: "Files To Upload",
      type: "file",
      width: "col-md-12",
      key: PcRequestKeys.FILES,
      value: modelData?.files,
      onChange: (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          let file: File = e.target?.files[0]!;
          console.log({ file });
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (url) => {
            handleModelData(PcRequestKeys.FILES, file);
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

      handleModelData("items", updatedItems);
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

      handleModelData("items", updatedItems);
      setSubTotalAmount(allItemsTotal);

      return updatedItems;
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

  // MAIN FUNCTIONS
  const handleCreateRequest = async () => {
    let numbersToValidate = PcRequestNumKeys;
    let stringsToValidate = PcRequestStrKeys;
    let requiredToValidate = PcRequestRequiredKeys;

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
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = pcRequestInput({
          ...modelData,
          files,
          items: stringItems,
          total: totalAmount,
          filesNameSet: stringAddedFiles,
          projectId: selectedProject?.id!,
        });
      } else {
        createInput = pcRequestInput({
          ...modelData,
          total: totalAmount,
          items: stringItems,
          projectId: selectedProject?.id!,
        });
      }
      await createMutation(createInput);
      push("/" + PAGES.PC_REQUESTS);
      showSuccess();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleEditRequest = async (toArchive = false) => {
    if (toArchive === false) {
      let numbersToValidate = PcRequestNumKeys;
      let stringsToValidate = PcRequestStrKeys;
      let requiredToValidate = PcRequestRequiredKeys;

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
      let stringRemovedFiles = JSON.stringify(removedFilesNameSet);
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = pcEditInput({
          ...modelData,
          items: stringItems,
          files,
          removedFilesNameSet: stringRemovedFiles,
          addedFilesNameSet: stringAddedFiles,
          is_archived: toArchive === true ? true : false,
        });
      } else {
        createInput = pcEditInput({
          ...modelData,
          items: stringItems,
          removedFilesNameSet: stringRemovedFiles,
          addedFilesNameSet: stringAddedFiles,
          is_archived: toArchive === true ? true : false,
        });
      }
      await editMutation({ data: createInput, id });
      push("/" + PAGES.PC_REQUESTS);
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
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = pcRequestInput({
          ...modelData,
          files,
          items: stringItems,
          total: totalAmount,
          filesNameSet: stringAddedFiles,
          projectId: selectedProject?.id!,
        });
      } else {
        createInput = pcRequestInput({
          ...modelData,
          total: totalAmount,
          items: stringItems,
          projectId: selectedProject?.id!,
        });
      }
      await archiveMutation(createInput);
      push("/" + PAGES.PC_REQUESTS);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  console.log({ oldFiles }, { files });

  if (!initialized) return <></>;
  return (
    <div className="container-xxl">
      <PageHeader headerTitle={""} isBtnShow={false} btnText={""} isBackBtn={true} />
      <div className="row g-3 pb-3 pb-xl-0">
        <div>
          <DocumentProjectFinancesBox
            budget={selectedProject?.pc_budget! ? Number(selectedProject?.pc_budget!) : 0}
            expenses={selectedProject?.pc_expenses! ? Number(selectedProject?.pc_expenses!) : 0}
            documentTotal={Number(totalAmount)}
          />
          <FormInputs formFields={formFields} grid={true} block={true} />
          <div className="d-flex flex-row justify-content-start align-items-start overflow-x-scroll pb-1">
            <OldFiles files={oldFiles} onRemove={handleRemoveOldFile} />
            <NewFiles files={files} onRemove={handleRemoveNewFile} />
          </div>
          <ItemsCard
            items={items}
            finances={documentFinancesObj}
            isVat={includeVat}
            toggleVat={handleVatToggle}
            onChangeItem={handleItemChange}
            onRemoveItem={handleRemoveItem}
            onAddItem={handleAddItem}
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
                documentData?.pcRequestDetails?.data?.user?.id!,
                documentData?.pcRequestDetails?.data!,
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
          documentType={"pc"}
        />
      </div>
    </div>
  );
};

export default PcFormPage;
