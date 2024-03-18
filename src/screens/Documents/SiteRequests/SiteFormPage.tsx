import { useSaveSiteRequestToArchive } from "api/Documents/SiteRequests/archiveSiteRequest";
import { siteRequestInput, useCreateSiteRequest } from "api/Documents/SiteRequests/createSiteRequest";
import { siteEditInput, useEditSiteRequest } from "api/Documents/SiteRequests/editSiteRequest";
import { useSiteRequestDetailsQuery } from "api/Documents/SiteRequests/getSiteRequestDetails";
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
  SiteRequestKeys,
  SiteRequestNumKeys,
  SiteRequestRequiredKeys,
  SiteRequestStrKeys,
} from "models/documents/SiteRequest";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { Project } from "types/Project";
import { SiteRequest } from "types/Site_request";
import { allowEditActionBtn } from "utils/ActionsGuards";
import { getFormattedTodayDate } from "utils/DateUtils";
import { getOptions } from "utils/GetOptions";
import { handleServerError, validateInputs } from "utils/HandlingServerError";

interface Props {
  id?: string;
}

const SiteFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<SiteRequest>({} as SiteRequest);
  const [modalHeader, setModalHeader] = useState<string>("");
  const [isPreviewModal, setIsPreviewModal] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project);
  // -----
  const { mutateAsync: createMutation } = useCreateSiteRequest();
  const { mutateAsync: editMutation } = useEditSiteRequest();
  const { mutateAsync: archiveMutation } = useSaveSiteRequestToArchive();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: projectsData, error: projectsError, isLoading: projectsIsLoading } = useProjectsQuery({});

  const { data: documentData, error: documentError, isLoading: documentIsLoading } = useSiteRequestDetailsQuery({ id });

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
      let document: SiteRequest = documentData?.siteRequestDetails?.data!;
      let selectedProject: Project = document?.project!;

      const initialModelData: any = {
        ...document!,
        project: selectedProject || ({} as Project),
      };

      setModelData({ ...initialModelData });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentData]);

  const handleInitialModelData = () => {
    modelData.date = `${getFormattedTodayDate()}`;
    modelData.description = `With reference to the above subject,`;
  };

  if ((id && documentIsLoading) || (!id && projectsIsLoading)) return <Loading />;
  if ((id && documentError) || (!id && projectsError)) return null;

  let projects: Project[] = projectsData?.projects?.data || [];
  let projectsOptions = getOptions(projects, "Select Project");

  const handleModelData = (key: string, value: any) => {
    if (key === SiteRequestKeys.PROJECT) {
      let sProject = projects.find((project) => project.id === value);
      setSelectedProject(sProject ? sProject : ({} as Project));
    }
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  // Modals Handling
  const handleOpenPreviewModal = () => {
    setModalHeader("Preview Site Request");
    modelData.type = DOCUMENT_TYPE.SITE;
    setIsPreviewModal(true);
  };

  const handleReset = () => {
    setSelectedProject({} as Project);
    setModelData({
      ...modelData,
      subject: "",
      date: "",
      project: {} as Project,
      description: `With reference to the above subject,`,
    });
  };

  const formFields: IField[] = [
    {
      label: "Subject",
      type: "text",
      width: "col-md-4",
      key: SiteRequestKeys.SUBJECT,
      value: modelData?.subject,
      onChange: (value: string | any) => handleModelData(SiteRequestKeys.SUBJECT, value),
      placeholder: "Enter Request Subject",
      required: true,
    },
    {
      label: "Project",
      type: "select",
      width: "col-md-4",
      key: SiteRequestKeys.PROJECT,
      value: selectedProject?.id!,
      onChange: (value: string | any) => handleModelData(SiteRequestKeys.PROJECT, value),
      options: projectsOptions,
      placeholder: "Select Project",
      required: true,
    },
    {
      label: "Date",
      type: "date",
      width: "col-md-4",
      key: SiteRequestKeys.DATE,
      value: modelData?.date,
      onChange: (value: string | any) => handleModelData(SiteRequestKeys.DATE, value),
      placeholder: "",
      required: true,
      default: `${getFormattedTodayDate()}`,
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: SiteRequestKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string | any) => handleModelData(SiteRequestKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      default: `With reference to the above subject,`,
    },
  ];

  // MAIN ACTIONS
  const handleCreateRequest = async () => {
    if (!modelData.description) modelData.description = `With reference to the above subject,`;
    if (!modelData.date) modelData.date = `${getFormattedTodayDate()}`;

    let numbersToValidate = SiteRequestNumKeys;
    let stringsToValidate = SiteRequestStrKeys;
    let requiredToValidate = SiteRequestRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = siteRequestInput(modelData);
      await createMutation({ ...createInput, projectId: selectedProject?.id! });
      push("/" + PAGES.SITE_REQUESTS);
      showSuccess();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleEditRequest = async (toArchive = false) => {
    if (toArchive === false) {
      let numbersToValidate = SiteRequestNumKeys;
      let stringsToValidate = SiteRequestStrKeys;
      let requiredToValidate = SiteRequestRequiredKeys;

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
      let createInput = siteEditInput({ ...modelData, is_archived: toArchive === true ? true : false });
      await editMutation({ data: createInput, id });
      push("/" + PAGES.SITE_REQUESTS);
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
      modelData.description = `With reference to the above subject,`;
    }
    if (!modelData.date) modelData.date = `${getFormattedTodayDate()}`;

    try {
      let createInput = siteRequestInput({ ...modelData });
      await archiveMutation({ data: createInput, id: selectedProject?.id! });
      push("/" + PAGES.SITE_REQUESTS);
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
          <FormInputs formFields={formFields} grid={true} block={true} />
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
                documentData?.siteRequestDetails?.data?.user?.id!,
                documentData?.siteRequestDetails?.data!,
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
        documentType={"site"}
      />
    </div>
  );
};

export default SiteFormPage;
