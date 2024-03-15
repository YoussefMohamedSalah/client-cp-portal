import ItemsCard from "components/Common/ItemsCard";
import { useSaveMaterialRequestToArchive } from "api/Documents/MaterialRequests/archiveMaterialRequest";
import { materialRequestInput, useCreateMaterialRequest } from "api/Documents/MaterialRequests/createMaterialRequest";
import { materialEditInput, useEditMaterialRequest } from "api/Documents/MaterialRequests/editMaterialRequest";
import { useMaterialRequestDetailsQuery } from "api/Documents/MaterialRequests/getMaterialRequestDetails";
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
import {
  MaterialRequestKeys,
  MaterialRequestNumKeys,
  MaterialRequestStrKeys,
  MaterialRequestRequiredKeys,
} from "models/documents/MaterialRequest";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { FileType } from "types/FileType";
import { IField } from "types/Forms/formFields";
import { ItemProps } from "types/ItemProps";
import { MaterialRequest } from "types/Material_request";
import { Project } from "types/Project";
import { allowEditActionBtn } from "utils/ActionsGuards";
import { getOptions } from "utils/GetOptions";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { getFormattedTodayDate } from "utils/DateUtils";

interface Props {
  id?: string;
}

const MaterialFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<MaterialRequest>({} as MaterialRequest);
  const [modalHeader, setModalHeader] = useState<string>("");
  const [isPreviewModal, setIsPreviewModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project);
  const [items, setItems] = useState<ItemProps[]>([{ description: "", item: "", count: "", price: "", total: "" }]);
  // ---
  const [files, setFiles] = useState<File[]>([]);
  const [filesNameSet, setFilesNameSet] = useState<string[]>([]);
  const [oldFiles, setOldFiles] = useState<FileType[]>([]);
  const [removedFilesNameSet, setRemovedFilesNameSet] = useState<string[]>([]);
  // ---
  const { mutateAsync: createMutation } = useCreateMaterialRequest();
  const { mutateAsync: editMutation } = useEditMaterialRequest();
  const { mutateAsync: archiveMutation } = useSaveMaterialRequestToArchive();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: projectsData, error: projectsError, isLoading: projectsIsLoading } = useProjectsQuery({});

  const {
    data: documentData,
    error: documentError,
    isLoading: documentIsLoading,
  } = useMaterialRequestDetailsQuery({ id });

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
      let document: MaterialRequest = documentData?.materialRequestDetails?.data!;
      let selectedProject: Project = document?.project;

      const initialModelData: any = {
        ...document!,
        project: selectedProject || ({} as Project),
      };

      setModelData({ ...initialModelData });
      if (document?.items! && document?.items?.length! > 0) {
        setItems(document?.items!);
        setOldFiles(document?.files);
      }
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentData]);

  const handleInitialModelData = () => {
    modelData.date = `${getFormattedTodayDate()}`;
    modelData.description = `Reference to above mentioned subject we are requesting the material below,
kindly note the following :
        1- All the requested material has been requested according to approved and according to shop drawings.
        2- All the requested material we have been checked that not available on CP stores.
Best Regards.`;
  };

  if ((id && documentIsLoading) || (!id && projectsIsLoading)) return <Loading />;
  if ((id && documentError) || (!id && projectsError)) return null;

  let projects: Project[] = projectsData?.projects?.data || [];
  let projectsOptions = getOptions(projects, "Select Project");

  const handleModelData = (key: string, value: any) => {
    if (key === MaterialRequestKeys.PROJECT) {
      value = projects.find((project) => project.id === value);
      setSelectedProject(value ? value : ({} as Project));
    }
    if (key === MaterialRequestKeys.FILES) {
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

  // Modals Handling
  const handleOpenPreviewModal = () => {
    setModalHeader("Preview Material Request");
    modelData.type = DOCUMENT_TYPE.MATERIAL;
    setIsPreviewModal(true);
  };

  const handleReset = () => {
    setModelData({
      ...modelData,
      subject: "",
      date: "",
      project: {} as Project,
      description: `Reference to above mentioned subject we are requesting the material below,
kindly note the following :
        1- All the requested material has been requested according to approved and according to shop drawings.
        2- All the requested material we have been checked that not available on CP stores.
Best Regards.`,
    });
  };

  const formFields: IField[] = [
    {
      label: "Subject",
      type: "text",
      width: "col-md-4",
      key: MaterialRequestKeys.SUBJECT,
      value: modelData?.subject,
      onChange: (value: string | any) => handleModelData(MaterialRequestKeys.SUBJECT, value),
      placeholder: "Enter Request Subject",
      required: true,
    },
    {
      label: "Date",
      type: "date",
      width: "col-md-4",
      key: MaterialRequestKeys.DATE,
      value: modelData?.date,
      onChange: (value: string | any) => handleModelData(MaterialRequestKeys.DATE, value),
      placeholder: "",
      required: true,
    },
    {
      label: "Project",
      type: "select",
      width: "col-md-4",
      key: MaterialRequestKeys.PROJECT,
      value: selectedProject?.name!,
      default: "",
      onChange: (value: string | any) => {
        handleModelData(MaterialRequestKeys.PROJECT, value);
      },
      options: projectsOptions,
      placeholder: "Select Project",
      required: true,
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: MaterialRequestKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string | any) => handleModelData(MaterialRequestKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      default: `Reference to above mentioned subject we are requesting the material below,
kindly note the following :
        1- All the requested material has been requested according to approved and according to shop drawings.
        2- All the requested material we have been checked that not available on CP stores.
Best Regards.`,
      required: true,
    },
    {
      label: "Files To Upload",
      type: "file",
      width: "col-md-12",
      key: MaterialRequestKeys.FILES,
      value: modelData?.files,
      onChange: (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
          let file: File = e.target?.files[0]!;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (url) => {
            handleModelData(MaterialRequestKeys.FILES, file);
          };
        }
      },
    },
  ];

  const handleItemChange = (index: number, prop: keyof ItemProps, value: string) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], [prop]: value };

      if (prop === "count" && value !== "") {
        updatedItems[index] = { ...updatedItems[index] };
      }

      handleModelData("items", updatedItems);
      return updatedItems;
    });
  };

  const handleAddItem = () => {
    setItems((prevItems) => [...prevItems, { description: "", item: "", count: "", price: "", total: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      handleModelData("items", updatedItems);
      return updatedItems;
    });
  };

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

  // MAIN FUNCTIONS
  const handleCreateRequest = async () => {
    if (!modelData.description) {
      modelData.description = `Reference to above mentioned subject we are requesting the material below,
    kindly note the following :
          1- All the requested material has been requested according to approved and according to shop drawings.
          2- All the requested material we have been checked that not available on CP stores.
    Best Regards.`;
    }

    let numbersToValidate = MaterialRequestNumKeys;
    let stringsToValidate = MaterialRequestStrKeys;
    let requiredToValidate = MaterialRequestRequiredKeys;

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
        createInput = materialRequestInput({
          ...modelData,
          files,
          items: stringItems,
          filesNameSet: stringAddedFiles,
          projectId: selectedProject?.id!,
        });
      } else {
        createInput = materialRequestInput({ ...modelData, items: stringItems, projectId: selectedProject?.id! });
      }
      await createMutation(createInput);
      showSuccess();
      push("/" + PAGES.MATERIAL_REQUESTS);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleEditRequest = async (toArchive = false) => {
    if (toArchive === false) {
      let numbersToValidate = MaterialRequestNumKeys;
      let stringsToValidate = MaterialRequestStrKeys;
      let requiredToValidate = MaterialRequestRequiredKeys;

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
        createInput = materialEditInput({
          ...modelData,
          items: stringItems,
          files,
          removedFilesNameSet: stringRemovedFiles,
          filesNameSet: stringAddedFiles,
          is_archived: toArchive === true ? true : false,
        });
      } else {
        createInput = materialEditInput({
          ...modelData,
          items: stringItems,
          removedFilesNameSet: stringRemovedFiles,
          filesNameSet: stringAddedFiles,
          is_archived: toArchive === true ? true : false,
        });
      }
      await editMutation({ data: createInput, id });
      push("/" + PAGES.MATERIAL_REQUESTS);
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
    if (!modelData.description) {
      modelData.description = `Reference to above mentioned subject we are requesting the material below,
    kindly note the following :
          1- All the requested material has been requested according to approved and according to shop drawings.
          2- All the requested material we have been checked that not available on CP stores.
    Best Regards.`;
    }

    try {
      let createInput;
      let stringItems = JSON.stringify(items);
      let stringAddedFiles = JSON.stringify(filesNameSet);
      if (files && files.length > 0) {
        createInput = materialRequestInput({
          ...modelData,
          files,
          items: stringItems,
          filesNameSet: stringAddedFiles,
          projectId: selectedProject?.id!,
        });
      } else {
        createInput = materialRequestInput({ ...modelData, items: stringItems, projectId: selectedProject?.id! });
      }
      await archiveMutation(createInput);
      showSuccess();
      push("/" + PAGES.MATERIAL_REQUESTS);
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
          <FormInputs formFields={formFields} grid={true} block={true} />
          <div className="d-flex flex-row justify-content-start align-items-start overflow-x-scroll pb-1">
            <OldFiles files={oldFiles} onRemove={handleRemoveOldFile} />
            <NewFiles files={files} onRemove={handleRemoveNewFile} />
          </div>
          <ItemsCard<ItemProps>
            items={items}
            onChangeItem={handleItemChange}
            onRemoveItem={handleRemoveItem}
            onAddItem={handleAddItem}
          />
        </div>
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
                documentData?.materialRequestDetails?.data?.user?.id!,
                documentData?.materialRequestDetails?.data!,
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
      </div>
      <DocumentPreviewModal
        onClose={() => setIsPreviewModal(false)}
        isModal={isPreviewModal}
        modalHeader={modalHeader}
        modelData={modelData}
        documentType={"material"}
      />
    </div>
  );
};

export default MaterialFormPage;
