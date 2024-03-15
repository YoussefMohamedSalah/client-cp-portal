import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import { TenderKeys, TenderNumKeys, TenderStrKeys, TenderRequiredKeys } from "models/Tender";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { Tender } from "types/Tender";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { tenderInput, useCreateTender } from "api/Tenders/createTender";
import { tenderUpdateInput, useUpdateTender } from "api/Tenders/updateTender";
import { useDeleteTender } from "api/Tenders/deleteTender";
import { useTenderDetailsQuery } from "api/Tenders/getTenderDetails";
import DeleteModal from "components/Modals/DeleteModal";
import { getFormattedTodayDate } from "utils/DateUtils";

interface Props {
  id?: string;
}

const TenderFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<Tender>({} as Tender);
  const [isModal, setIsModal] = useState<boolean>(false);
  // -----
  const { mutateAsync: createMutation } = useCreateTender();
  const { mutateAsync: updateMutation } = useUpdateTender();
  const { mutateAsync: deleteMutation } = useDeleteTender();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: TenderData, error: TenderError, isLoading: TenderIsLoading } = useTenderDetailsQuery({ id });

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
      modelData.date = `${getFormattedTodayDate()}`;
      modelData.hand_over = `${getFormattedTodayDate()}`;
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && TenderData) {
      let Tender: Tender = TenderData?.tender?.data!;
      setModelData({ ...Tender });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TenderData]);

  if (id && TenderIsLoading) return <Loading />;
  if (id && TenderError) return null;

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleReset = () => {
    setModelData({
      ...modelData,
      date: `${getFormattedTodayDate()}`,
      hand_over: `${getFormattedTodayDate()}`,
      description: "",
      comments: [],
    });
  };

  const formFields: IField[] = [
    {
      label: "Date",
      type: "date",
      width: "col-md-6",
      key: TenderKeys.DATE,
      value: modelData?.date,
      onChange: (value: string | any) => handleModelData(TenderKeys.DATE, value),
      placeholder: "Date",
    },
    {
      label: "Hand Over Date",
      type: "date",
      width: "col-md-6",
      key: TenderKeys.HAND_OVER,
      value: modelData?.hand_over,
      onChange: (value: string | any) => handleModelData(TenderKeys.HAND_OVER, value),
      placeholder: "Hand Over Date",
      required: true,
      default: `${getFormattedTodayDate()}`,
    },
    {
      label: "Description",
      width: "col-md-12",
      type: "textarea",
      key: TenderKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string | any) => handleModelData(TenderKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      required: false,
    },
    {
      label: "Tender Files",
      width: "col-md-12",
      type: "file",
      key: TenderKeys.FILES,
      value: modelData?.files,
      onChange: (e: any) => {
        let file: File = e.target?.files[0]!;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (url) => {
          handleModelData(TenderKeys.FILES, file);
        };
      },
      placeholder: "Enter Thumbnail",
    },
    {
      label: "Comment",
      width: "col-md-12",
      type: "textarea",
      key: TenderKeys.COMMENTS,
      value: modelData?.comments,
      onChange: (value: string | any) => handleModelData(TenderKeys.COMMENTS, value),
      placeholder: "Enter Comment",
    },
  ];

  const handleCreate = async () => {
    let numbersToValidate = TenderNumKeys;
    let stringsToValidate = TenderStrKeys;
    let requiredToValidate = TenderRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = tenderInput(modelData);
      await createMutation(createInput);
      push("/" + PAGES.TENDERS);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEdit = async () => {
    let numbersToValidate = TenderNumKeys;
    let stringsToValidate = TenderStrKeys;
    let requiredToValidate: string[] = [];

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = tenderUpdateInput(modelData);
      await updateMutation({
        id: modelData.id,
        data: createInput,
      });
      showSuccess();
      push("/" + PAGES.TENDERS);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation(modelData.id!);
      showSuccess();
      push("/" + PAGES.TENDERS);
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
              <Button className="lift" content="Cancel" onClick={() => push("/" + PAGES.TENDERS)} variant="secondary" />
            </>
          ) : (
            <>
              <Button className="lift" content="Reset" onClick={handleReset} variant="secondary" />
            </>
          )}
          {isEdit ? (
            <>
              <Button className="lift" content="Edit" onClick={handleEdit} />
            </>
          ) : (
            <>
              <Button className="lift" content="Create" onClick={handleCreate} />
            </>
          )}
          {modelData.id && (
            <Button
              className="lift"
              content="details"
              onClick={() => push("/" + PAGES.TENDER_INFO + "/" + modelData.id)}
            />
          )}
        </div>
      </div>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={handleDelete}
        message={`Are you sure you want to delete ${modelData.code}?`}
        modalHeader={`Delete ${modelData.code}`}
      />
    </div>
  );
};

export default TenderFormPage;
