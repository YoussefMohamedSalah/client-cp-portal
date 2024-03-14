import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { CUSTOMER_TYPE } from "enums/enums";
import useApp from "hooks/useApp";
import { CustomerKeys, CustomerNumKeys, CustomerStrKeys, CustomerRequiredKeys } from "models/Customer";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { Customer } from "types/Customer";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { customerInput, useCreateCustomer } from "api/Customers/createCustomer";
import { customerUpdateInput, useUpdateCustomer } from "api/Customers/updateCustomer";
import { useDeleteCustomer } from "api/Customers/deleteCustomer";
import { useCustomerDetailsQuery } from "api/Customers/getCustomerDetails";
import DeleteModal from "components/Modals/DeleteModal";

interface Props {
  id?: string;
}

const CustomerFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<Customer>({} as Customer);
  const [isModal, setIsModal] = useState<boolean>(false);
  // -----
  const { mutateAsync: createMutation } = useCreateCustomer();
  const { mutateAsync: updateMutation } = useUpdateCustomer();
  const { mutateAsync: deleteMutation } = useDeleteCustomer();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: customerData, error: customerError, isLoading: customerIsLoading } = useCustomerDetailsQuery({ id });
  console.log(customerData);
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
      modelData.customer_type = CUSTOMER_TYPE.COMPANY;
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && customerData) {
      let customer: Customer = customerData?.customer?.data!;
      setModelData({ ...customer });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData]);

  if (id && customerIsLoading) return <Loading />;
  if (id && customerError) return null;

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
      key: CustomerKeys.NAME,
      value: modelData?.name,
      onChange: (value: string | any) => handleModelData(CustomerKeys.NAME, value),
      placeholder: "Name",
      required: true,
    },
    {
      label: "Company Name",
      type: "text",
      width: "col-md-6",
      key: CustomerKeys.COMPANY_NAME,
      value: modelData?.company_name,
      onChange: (value: string | any) => handleModelData(CustomerKeys.COMPANY_NAME, value),
      placeholder: "Company Name",
      required: true,
    },
    {
      label: "Customer Type",
      type: "select",
      width: "col-md-6",
      key: CustomerKeys.CUSTOMER_TYPE,
      value: modelData?.customer_type,
      onChange: (value: string) => handleModelData(CustomerKeys.CUSTOMER_TYPE, value),
      options: [
        { value: "Company", label: "Company" },
        { value: "Individual", label: "Individual" },
      ],
      placeholder: "Select Customer Type",
      required: true,
    },
    {
      label: "Phone Number",
      type: "text",
      width: "col-md-6",
      key: CustomerKeys.PHONE_NUMBER,
      value: modelData?.phone_number,
      onChange: (value: string | any) => handleModelData(CustomerKeys.PHONE_NUMBER, value),
      placeholder: "Phone Number",
      required: true,
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-6",
      key: CustomerKeys.EMAIL,
      value: modelData?.email,
      onChange: (value: string | any) => handleModelData(CustomerKeys.EMAIL, value),
      placeholder: "Email",
      required: true,
    },
    {
      label: "Vat On",
      type: "number",
      width: "col-md-6",
      key: CustomerKeys.VAT_ON,
      value: modelData?.vat_on,
      onChange: (value: string | any) => handleModelData(CustomerKeys.VAT_ON, value),
      placeholder: "Vat On",
    },
    {
      label: "Country",
      type: "text",
      width: "col-md-6",
      key: CustomerKeys.COUNTRY,
      value: modelData?.country,
      onChange: (value: string | any) => handleModelData(CustomerKeys.COUNTRY, value),
      placeholder: "Country",
      required: true,
    },
    {
      label: "City",
      type: "text",
      width: "col-md-3",
      key: CustomerKeys.CITY,
      value: modelData?.city,
      onChange: (value: string | any) => handleModelData(CustomerKeys.CITY, value),
      placeholder: "City",
      required: true,
    },
    {
      label: "Area",
      type: "text",
      width: "col-md-3",
      key: CustomerKeys.AREA,
      value: modelData?.area,
      onChange: (value: string | any) => handleModelData(CustomerKeys.AREA, value),
      placeholder: "Area",
    },
    {
      label: "Street",
      type: "text",
      width: "col-md-6",
      key: CustomerKeys.STREET,
      value: modelData?.street,
      onChange: (value: string | any) => handleModelData(CustomerKeys.STREET, value),
      placeholder: "Street",
    },
    {
      label: "Building Number",
      type: "text",
      width: "col-md-3",
      key: CustomerKeys.BUILDING_NUMBER,
      value: modelData?.building_number,
      onChange: (value: string | any) => handleModelData(CustomerKeys.BUILDING_NUMBER, value),
      placeholder: "Building Number",
    },
    {
      label: "Postal Code",
      type: "number",
      width: "col-md-3",
      key: CustomerKeys.POSTAL_CODE,
      value: modelData?.postal_code,
      onChange: (value: string | any) => handleModelData(CustomerKeys.POSTAL_CODE, value),
      placeholder: "Postal Code",
    },
  ];

  // MAIN ACTIONS
  const handleCreate = async () => {
    let numbersToValidate = CustomerNumKeys;
    let stringsToValidate = CustomerStrKeys;
    let requiredToValidate = CustomerRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = customerInput(modelData);
      await createMutation(createInput);
      push("/" + PAGES.CUSTOMERS, true);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEdit = async () => {
    let numbersToValidate = CustomerNumKeys;
    let stringsToValidate = CustomerStrKeys;
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
      let createInput = customerUpdateInput(modelData);
      await updateMutation({
        id: modelData.id,
        data: createInput,
      });
      push("/" + PAGES.CUSTOMERS, true);
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
        message={`Are you sure you want to delete this ${modelData.name}?`}
        modalHeader={`Delete ${modelData.name}`}
      />
    </div>
  );
};

export default CustomerFormPage;
