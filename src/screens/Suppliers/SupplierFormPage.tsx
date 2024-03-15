import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { SUPPLIER_TYPE } from "enums/enums";
import useApp from "hooks/useApp";
import { SupplierKeys, SupplierNumKeys, SupplierStrKeys, SupplierRequiredKeys } from "models/Supplier";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { Supplier } from "types/Supplier";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { supplierInput, useCreateSupplier } from "api/Suppliers/createSupplier";
import { supplierUpdateInput, useUpdateSupplier } from "api/Suppliers/updateSupplier";
import { useDeleteSupplier } from "api/Suppliers/deleteSupplier";
import { useSupplierDetailsQuery } from "api/Suppliers/getSupplierDetails";
import DeleteModal from "components/Modals/DeleteModal";

interface Props {
  id?: string;
}

const SupplierFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<Supplier>({} as Supplier);
  const [isModal, setIsModal] = useState<boolean>(false);
  // -----
  const { mutateAsync: createMutation } = useCreateSupplier();
  const { mutateAsync: updateMutation } = useUpdateSupplier();
  const { mutateAsync: deleteMutation } = useDeleteSupplier();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: supplierData, error: supplierError, isLoading: supplierIsLoading } = useSupplierDetailsQuery({ id });

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
      modelData.supplier_type = SUPPLIER_TYPE.COMPANY;
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && supplierData) {
      let customer: Supplier = supplierData?.supplier?.data!;
      setModelData({ ...customer });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplierData]);

  if (id && supplierIsLoading) return <Loading />;
  if (id && supplierError) return null;

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
      label: "Name",
      type: "text",
      width: "col-md-6",
      key: SupplierKeys.NAME,
      value: modelData?.name,
      onChange: (value: string | any) => handleModelData(SupplierKeys.NAME, value),
      placeholder: "Name",
      required: true,
    },
    {
      label: "Company Name",
      type: "text",
      width: "col-md-6",
      key: SupplierKeys.COMPANY_NAME,
      value: modelData?.company_name,
      onChange: (value: string | any) => handleModelData(SupplierKeys.COMPANY_NAME, value),
      placeholder: "Company Name",
      required: true,
    },
    {
      label: "Supplier Type",
      type: "select",
      width: "col-md-6",
      key: SupplierKeys.SUPPLIER_TYPE,
      value: modelData?.supplier_type,
      onChange: (value: string) => handleModelData(SupplierKeys.SUPPLIER_TYPE, value),
      options: [
        { value: "Company", label: "Company" },
        { value: "Individual", label: "Individual" },
      ],
      placeholder: "Select Supplier Type",
      required: true,
    },
    {
      label: "Phone Number",
      type: "text",
      width: "col-md-6",
      key: SupplierKeys.PHONE_NUMBER,
      value: modelData?.phone_number,
      onChange: (value: string | any) => handleModelData(SupplierKeys.PHONE_NUMBER, value),
      placeholder: "Phone Number",
      required: true,
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-6",
      key: SupplierKeys.EMAIL,
      value: modelData?.email,
      onChange: (value: string | any) => handleModelData(SupplierKeys.EMAIL, value),
      placeholder: "Email",
      required: true,
    },
    {
      label: "Vat On",
      type: "number",
      width: "col-md-6",
      key: SupplierKeys.VAT_ON,
      value: modelData?.vat_on,
      onChange: (value: string | any) => handleModelData(SupplierKeys.VAT_ON, value),
      placeholder: "Vat On",
      required: true,
    },
    {
      label: "Country",
      type: "text",
      width: "col-md-6",
      key: SupplierKeys.COUNTRY,
      value: modelData?.country,
      onChange: (value: string | any) => handleModelData(SupplierKeys.COUNTRY, value),
      placeholder: "Country",
      required: true,
    },
    {
      label: "City",
      type: "text",
      width: "col-md-3",
      key: SupplierKeys.CITY,
      value: modelData?.city,
      onChange: (value: string | any) => handleModelData(SupplierKeys.CITY, value),
      placeholder: "City",
      required: true,
    },
    {
      label: "Area",
      type: "text",
      width: "col-md-3",
      key: SupplierKeys.AREA,
      value: modelData?.area,
      onChange: (value: string | any) => handleModelData(SupplierKeys.AREA, value),
      placeholder: "Area",
    },
    {
      label: "Street",
      type: "text",
      width: "col-md-6",
      key: SupplierKeys.STREET,
      value: modelData?.street,
      onChange: (value: string | any) => handleModelData(SupplierKeys.STREET, value),
      placeholder: "Street",
    },
    {
      label: "Building Number",
      type: "text",
      width: "col-md-3",
      key: SupplierKeys.BUILDING_NUMBER,
      value: modelData?.building_number,
      onChange: (value: string | any) => handleModelData(SupplierKeys.BUILDING_NUMBER, value),
      placeholder: "Building Number",
    },
    {
      label: "Postal Code",
      type: "number",
      width: "col-md-3",
      key: SupplierKeys.POSTAL_CODE,
      value: modelData?.postal_code,
      onChange: (value: string | any) => handleModelData(SupplierKeys.POSTAL_CODE, value),
      placeholder: "Postal Code",
    },
  ];

  // MAIN ACTIONS
  const handleCreate = async () => {
    let numbersToValidate = SupplierNumKeys;
    let stringsToValidate = SupplierStrKeys;
    let requiredToValidate = SupplierRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = supplierInput(modelData);
      await createMutation(createInput);
      push("/" + PAGES.SUPPLIERS, true);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEdit = async () => {
    let numbersToValidate = SupplierNumKeys;
    let stringsToValidate = SupplierStrKeys;
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
      let createInput = supplierUpdateInput(modelData);
      await updateMutation({
        id: modelData.id,
        data: createInput,
      });
      push("/" + PAGES.SUPPLIERS, true);
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
                onClick={() => push("/" + PAGES.SUPPLIERS)}
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
            onClick={() => push("/" + PAGES.SUPPLIER_INFO + "/" + modelData.id)}
          />
        </div>
      </div>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={handleDelete}
        message={`Are you sure you want to delete this ${modelData.name}?`}
        modalHeader={`Delete ${modelData.name}`}
      />
    </div>
  );
};

export default SupplierFormPage;
