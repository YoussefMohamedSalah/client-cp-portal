import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import {
  TenderKeys,
  TenderNumKeys,
  TenderStrKeys,
  TenderRequiredKeys,
} from "models/Tender";
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
import { useCustomersQuery } from "api/Customers/getAllCustomers";
import { useEmployeesQuery } from "api/Employees/getAllEmployees";
import { Customer } from "types/Customer";
import { getOptions } from "utils/GetOptions";
import { Employee } from "types/Employee";

interface Props {
  id: string | null;
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

  const {
    data: TenderData,
    error: TenderError,
    isLoading: TenderIsLoading,
  } = useTenderDetailsQuery({ id });

  const {
    data: customersData,
    error: customersError,
    isLoading: customersIsLoading,
  } = useCustomersQuery({});

  const {
    data: employeesData,
    error: employeesError,
    isLoading: employeesIsLoading,
  } = useEmployeesQuery({});

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

  if (
    (id && TenderIsLoading) ||
    (!id && customersIsLoading) ||
    (!id && employeesIsLoading)
  )
    return <Loading />;
  if ((id && TenderError) || (!id && customersError) || (!id && employeesError))
    return null;

  let customers: Customer[] = customersData?.customers?.data || [];
  let employees: Employee[] = employeesData?.employees?.data || [];

  let customersOptions = getOptions(customers, "Select Customer");
  let employeesOptions = getOptions(employees, "Select");

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleReset = () => {
    // setModelData({
    //     ...modelData,
    //     company_name: '',
    //     vat_on: 0,
    //     name: "",
    //     phone_number: "",
    //     email: "",
    //     country: "",
    //     city: "",
    //     area: "",
    //     street: "",
    //     building_number: "",
    //     postal_code: null,
    // })
  };

  const formFields: IField[] = [
    {
      label: "CODE",
      type: "text",
      width: "col-md-4",
      key: TenderKeys.CODE,
      value: modelData?.code,
      onChange: (value: string) => handleModelData(TenderKeys.CODE, value),
      placeholder: "Enter Code",
      required: true,
    },
    {
      label: "USER",
      type: "select",
      width: "col-md-4",
      key: TenderKeys.USER,
      value: modelData?.user?.name!,
      onChange: (value: string) => handleModelData(TenderKeys.USER, value),
      options: customersOptions,
      placeholder: "Select User",
      required: !isEdit ? true : false,
      disabled: isEdit ? true : false,
    },
    {
      label: "DATE",
      type: "select",
      width: "col-md-4",
      key: TenderKeys.DATE,
      value: modelData?.date!,
      onChange: (value: string) => handleModelData(TenderKeys.DATE, value),
      options: employeesOptions,
      placeholder: "Select Date",
    },

    {
      label: "HAND OVER DATE",
      type: "select",
      width: "col-md-6",
      key: TenderKeys.HAND_OVER,
      value: modelData.hand_over! || [],
      onChange: (value: string) => handleModelData(TenderKeys.HAND_OVER, value),
      required: false,
      placeholder: "Assign Hand Over Date",
    },
    {
      label: "STATUS",
      type: "text",
      width: "col-md-3",
      key: TenderKeys.STATUS,
      value: modelData?.latitude,
      onChange: (value: string) => handleModelData(TenderKeys.STATUS, value),
      placeholder: "",
    },
  ];

  // MAIN ACTIONS

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
      <PageHeader
        headerTitle={""}
        isBtnShow={false}
        btnText={""}
        isBackBtn={true}
      />
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
                onClick={() => push("/" + PAGES.TENDERS)}
                variant="secondary"
              />
            </>
          ) : (
            <>
              <Button
                className="lift"
                content="Reset"
                onClick={handleReset}
                variant="secondary"
              />
            </>
          )}
          {isEdit ? (
            <>
              <Button className="lift" content="Edit" onClick={handleEdit} />
            </>
          ) : (
            <>
              <Button
                className="lift"
                content="Create"
                onClick={handleCreate}
              />
            </>
          )}
          <Button
            className="lift"
            content="details"
            onClick={() => push("/" + PAGES.TENDER_INFO + "/" + modelData.id)}
          />
        </div>
      </div>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={handleDelete}
        message={`Are you sure you want to delete ${modelData.name}?`}
        modalHeader={`Delete ${modelData.name}`}
      />
    </div>
  );
};

export default TenderFormPage;
