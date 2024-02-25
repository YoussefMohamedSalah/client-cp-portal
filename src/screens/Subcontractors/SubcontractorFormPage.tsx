import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { SUBCONTRACTOR_TYPE } from "enums/enums";
import useApp from "hooks/useApp";
import {
  SubcontractorKeys,
  SubcontractorNumKeys,
  SubcontractorStrKeys,
  SubcontractorRequiredKeys,
} from "models/Subcontractor";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { Subcontractor } from "types/Subcontractor";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import DeleteModal from "components/Modals/DeleteModal";
import { subcontractorInput, useCreateSubcontractor } from "api/Subcontractors/createSubcontractor";
import { useDeleteSubcontractor } from "api/Subcontractors/deleteSubcontractor";
import { subcontractorUpdateInput, useUpdateSubcontractor } from "api/Subcontractors/updateSubcontractor";
import { useSubcontractorDetailsQuery } from "api/Subcontractors/getSubcontractor";

interface Props {
  id?: string;
}

const SubcontractorFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<Subcontractor>({} as Subcontractor);
  const [isModal, setIsModal] = useState<boolean>(false);
  // -----
  const { mutateAsync: createMutation } = useCreateSubcontractor();
  const { mutateAsync: updateMutation } = useUpdateSubcontractor();
  const { mutateAsync: deleteMutation } = useDeleteSubcontractor();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const {
    data: subcontractorData,
    error: subcontractorError,
    isLoading: subcontractorIsLoading,
  } = useSubcontractorDetailsQuery({ id });

  // !Check if this is CREATE OR EDIT Modal
  useEffect(() => {
    if (!initialized) {
      if (id) setIsEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // !Assuming this is CREATE Modal
  useEffect(() => {
    if (!isEdit) {
      modelData.subcontractor_type = SUBCONTRACTOR_TYPE.COMPANY;
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && subcontractorData) {
      let subcontractor: Subcontractor = subcontractorData?.subcontractor?.data!;
      setModelData({ ...subcontractor });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcontractorData]);

  if (id && subcontractorIsLoading) return <Loading />;
  if (id && subcontractorError) return null;

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleReset = () => {
    setModelData({
      ...modelData,
      company_name: "",
      vat_on: 0,
      name: "",
      phone_number: "",
      email: "",
      country: "",
      city: "",
      area: "",
      street: "",
      building_number: "",
      postal_code: null,
    });
  };

  const formFields: IField[] = [
    {
      label: "NAME Name",
      type: "text",
      width: "col-md-6",
      key: SubcontractorKeys.NAME,
      value: modelData?.name,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.NAME, value),
      placeholder: "NAME Name",
      required: true,
    },
    {
      label: "Company Name",
      type: "text",
      width: "col-md-6",
      key: SubcontractorKeys.COMPANY_NAME,
      value: modelData?.company_name,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.COMPANY_NAME, value),
      placeholder: "Company Name",
      required: true,
    },
    {
      label: "Subcontractor Type",
      type: "select",
      width: "col-md-6",
      key: SubcontractorKeys.SUBCONTRACTOR_TYPE,
      value: modelData?.subcontractor_type,
      onChange: (value: string) => handleModelData(SubcontractorKeys.SUBCONTRACTOR_TYPE, value),
      options: [
        { value: "Company", label: "Company" },
        { value: "Individual", label: "Individual" },
      ],
      placeholder: "Select Subcontractor Type",
      required: true,
    },
    {
      label: "Phone Number",
      type: "text",
      width: "col-md-6",
      key: SubcontractorKeys.PHONE_NUMBER,
      value: modelData?.phone_number,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.PHONE_NUMBER, value),
      placeholder: "Phone Number",
      required: true,
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-6",
      key: SubcontractorKeys.EMAIL,
      value: modelData?.email,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.EMAIL, value),
      placeholder: "Email",
      required: true,
    },
    {
      label: "Vat On",
      type: "text",
      width: "col-md-6",
      key: SubcontractorKeys.VAT_ON,
      value: modelData?.vat_on,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.VAT_ON, value),
      placeholder: "Vat On",
    },
    {
      label: "Country",
      type: "text",
      width: "col-md-6",
      key: SubcontractorKeys.COUNTRY,
      value: modelData?.country,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.COUNTRY, value),
      placeholder: "Country",
      required: true,
    },
    {
      label: "City",
      type: "text",
      width: "col-md-3",
      key: SubcontractorKeys.CITY,
      value: modelData?.city,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.CITY, value),
      placeholder: "City",
      required: true,
    },
    {
      label: "Area",
      type: "text",
      width: "col-md-3",
      key: SubcontractorKeys.AREA,
      value: modelData?.area,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.AREA, value),
      placeholder: "Area",
    },
    {
      label: "Street",
      type: "text",
      width: "col-md-6",
      key: SubcontractorKeys.STREET,
      value: modelData?.street,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.STREET, value),
      placeholder: "Street",
    },
    {
      label: "Building Number",
      type: "text",
      width: "col-md-3",
      key: SubcontractorKeys.BUILDING_NUMBER,
      value: modelData?.building_number,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.BUILDING_NUMBER, value),
      placeholder: "Building Number",
    },
    {
      label: "Postal Code",
      type: "text",
      width: "col-md-3",
      key: SubcontractorKeys.POSTAL_CODE,
      value: modelData?.postal_code,
      onChange: (value: string | any) => handleModelData(SubcontractorKeys.POSTAL_CODE, value),
      placeholder: "Postal Code",
    },
  ];

  const handleCreate = async () => {
    let numbersToValidate = SubcontractorNumKeys;
    let stringsToValidate = SubcontractorStrKeys;
    let requiredToValidate = SubcontractorRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    console.log(errors);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = subcontractorInput(modelData);
      await createMutation(createInput);
      push("/" + PAGES.SUBCONTRACTORS, true);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEdit = async () => {
    let numbersToValidate = SubcontractorNumKeys;
    let stringsToValidate = SubcontractorStrKeys;
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
      let createInput = subcontractorUpdateInput(modelData);
      await updateMutation({
        id: modelData.id,
        data: createInput,
      });
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation(modelData.id!);
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
                onClick={() => push("/" + PAGES.CUSTOMERS)}
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
              <Button className="lift" content="Edit" onClick={handleEdit} />
            </>
          ) : (
            <>
              <Button className="lift" content="Create" onClick={handleCreate} />
            </>
          )}
          <Button
            className="lift"
            content="profile"
            onClick={() => push("/" + PAGES.CUSTOMER_INFO + "/" + modelData.id)}
          />
        </div>
      </div>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={handleDelete}
        message={`Are you sure you want to delete this Subcontractor?`}
        modalHeader={`Delete Subcontractor`}
      />
    </div>
  );
};

export default SubcontractorFormPage;
