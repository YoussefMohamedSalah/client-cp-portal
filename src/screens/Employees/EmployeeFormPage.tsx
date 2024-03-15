import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import { EmployeeKeys, EmployeeNumKeys, EmployeeStrKeys, EmployeeRequiredKeys } from "models/Employee";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { Employee } from "types/Employee";
import { handleError, handleServerError, validateInputs } from "utils/HandlingServerError";
import DeleteModal from "components/Modals/DeleteModal";
import { employeeUpdateInput, useUpdateEmployee } from "api/Employees/updateEmployee";
import { employeeInput, useCreateEmployee } from "api/Employees/createEmployee";
import { useDeleteEmployee } from "api/Employees/deleteEmployee";
import { useEmployeeDetailsQuery } from "api/Employees/getEmployeeDetails";
import { Project } from "types/Project";
import { getOptions } from "utils/GetOptions";
import { useProjectsQuery } from "api/Projects/getAllProjects";
import { useDepartmentsQuery } from "api/Departments/getAllDepartments";

interface Props {
  id?: string;
}

const EmployeeFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<Employee>({} as Employee);
  const [isModal, setIsModal] = useState<boolean>(false);
  // -----
  const { mutateAsync: createMutation } = useCreateEmployee();
  const { mutateAsync: updateMutation } = useUpdateEmployee();
  const { mutateAsync: deleteMutation } = useDeleteEmployee();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: employeeData, error: employeeError, isLoading: employeeIsLoading } = useEmployeeDetailsQuery({ id });

  // const {
  //     data: managerData,
  //     error: managerError,
  //     isLoading: managerIsLoading,
  // } = useManagersQuery({});

  const { data: projectsData, error: projectsError, isLoading: projectsIsLoading } = useProjectsQuery({});
  const { data: departmentData, error: departmentError, isLoading: departmentIsLoading } = useDepartmentsQuery({});

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
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && employeeData) {
      let employee: Employee = employeeData?.employee?.data!;
      setModelData({
        ...employee,
        projects: employee.projects_info || [],
        department: employee.department_info || { id: "0", name: "Select Department" },
      });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeData]);

  if ((id && employeeIsLoading) || departmentIsLoading || projectsIsLoading) return <Loading />;
  if (employeeError || departmentError || projectsError) return null;

  let projects: Project[] = projectsData?.projects?.data || ([] as Project[]);
  let departments: any[] = departmentData?.departments?.data || [];

  let projectsOptions = getOptions(projects, "Select Project");
  let departmentsOptions = getOptions(departments, "Select Department");

  const handleModelData = (key: string, value: any) => {
    if (key === EmployeeKeys.PROJECT) {
      if (value && Array.isArray(value)) {
        let projectsArr: Project[] = [];
        for (let i = 0; i < value.length; i++) {
          const id: string = value[i].value! || value[i].id!;
          let project = projects?.find((project: Project) => project.id === id) || ({} as Project);
          if (project && project.id) projectsArr.push(project);
        }
        value = projectsArr;
      }
    }
    if (key === EmployeeKeys.DEPARTMENT) {
      value = departments?.find((department: any) => department.id === value) || ({} as Employee);
    }
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const formFields: IField[] = [
    {
      label: "Full Name",
      type: "text",
      width: "col-md-6",
      key: EmployeeKeys.NAME,
      value: modelData?.name,
      onChange: (value: string) => handleModelData(EmployeeKeys.NAME, value),
      placeholder: "Enter Full Name",
      required: true,
    },
    {
      label: "Phone Number",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.PHONE_NUMBER,
      value: modelData?.phone_number,
      onChange: (value: string) => handleModelData(EmployeeKeys.PHONE_NUMBER, value),
      placeholder: "Phone Number",
      required: true,
    },
    {
      label: "Department",
      type: "select",
      width: "col-md-3",
      key: EmployeeKeys.DEPARTMENT,
      value: modelData?.department?.name!,
      onChange: (value: string | any) => handleModelData(EmployeeKeys.DEPARTMENT, value),
      options: departmentsOptions,
      placeholder: "Select Department",
      required: true,
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.EMAIL,
      value: modelData?.email,
      onChange: (value: string) => handleModelData(EmployeeKeys.EMAIL, value),
      placeholder: "Email",
      required: true,
    },
    {
      label: "Password",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.PASSWORD,
      value: modelData?.password,
      onChange: (value: string) => handleModelData(EmployeeKeys.PASSWORD, value),
      placeholder: "Password",
      required: false,
      disabled: isEdit ? true : false,
    },
    {
      label: "Contract Date",
      type: "date",
      width: "col-md-3",
      key: EmployeeKeys.CONTRACT_DATE,
      value: modelData?.contract_date,
      onChange: (value: any) => handleModelData(EmployeeKeys.CONTRACT_DATE, value),
      placeholder: "Enter Start Date",
    },
    {
      label: "Contract EX_Date",
      type: "date",
      width: "col-md-3",
      key: EmployeeKeys.CONTRACT_EX_DATE,
      value: modelData?.contract_ex,
      onChange: (value: any) => handleModelData(EmployeeKeys.CONTRACT_EX_DATE, value),
      placeholder: "Enter Start Date",
    },
    {
      label: "ID Number",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.ID_NUMBER,
      value: modelData?.id_number,
      onChange: (value: string) => handleModelData(EmployeeKeys.ID_NUMBER, value),
      placeholder: "ID Number",
    },
    {
      label: "ID EX_Date",
      type: "date",
      width: "col-md-3",
      key: EmployeeKeys.ID_EX_DATE,
      value: modelData?.id_ex_date,
      onChange: (value: any) => handleModelData(EmployeeKeys.ID_EX_DATE, value),
      placeholder: "ID Expiration Date",
    },
    {
      label: "Joining Date",
      type: "date",
      width: "col-md-3",
      key: EmployeeKeys.JOINING_DATE,
      value: modelData?.joining_date,
      onChange: (value: any) => handleModelData(EmployeeKeys.JOINING_DATE, value),
      placeholder: "Joining Date",
      required: true,
    },
    {
      label: "Nationality",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.NATIONALITY,
      value: modelData?.nationality,
      onChange: (value: string) => handleModelData(EmployeeKeys.NATIONALITY, value),
      placeholder: "Nationality",
      required: true,
    },
    {
      label: "Residence Number",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.RESIDENCE_NUMBER,
      value: modelData?.residence_number,
      onChange: (value: string) => handleModelData(EmployeeKeys.RESIDENCE_NUMBER, value),
      placeholder: "Residence Number",
      required: false,
    },
    {
      label: "IBAN Number",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.IBAN_NUMBER,
      value: modelData?.iban_number,
      onChange: (value: string) => handleModelData(EmployeeKeys.IBAN_NUMBER, value),
      placeholder: "IBAN Number",
      required: false,
    },
    {
      label: "Site Role",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.SITE_ROLE,
      value: modelData?.site_role,
      onChange: (value: string) => handleModelData(EmployeeKeys.SITE_ROLE, value),
      placeholder: "Site Role",
      required: false,
    },
    {
      label: "Site Job",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.SITE_JOB,
      value: modelData?.site_job,
      onChange: (value: string) => handleModelData(EmployeeKeys.SITE_JOB, value),
      placeholder: "Site Job",
      required: false,
    },
    {
      label: "Shift Start",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.SHIFT_START,
      value: modelData?.shift_start,
      onChange: (value: string) => handleModelData(EmployeeKeys.SHIFT_START, value),
      placeholder: "EX: 09:00",
      required: true,
    },
    {
      label: "Shift End",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.SHIFT_END,
      value: modelData?.shift_end,
      onChange: (value: string) => handleModelData(EmployeeKeys.SHIFT_END, value),
      placeholder: "EX: 17:00",
      required: true,
    },
    {
      label: "Salary",
      type: "text",
      width: "col-md-3",
      key: EmployeeKeys.SALARY,
      value: modelData?.salary_per_month,
      onChange: (value: string) => handleModelData(EmployeeKeys.SALARY, value),
      placeholder: "Per Month",
    },

    {
      label: "Role",
      type: "select",
      width: "col-md-3",
      key: EmployeeKeys.ROLE,
      value: modelData?.role,
      onChange: (value: string | any) => handleModelData(EmployeeKeys.ROLE, value),
      options: [
        { value: "", label: "Select Role" },
        { value: "User", label: "User" },
        { value: "Manager", label: "Manager" },
        { value: "Director", label: "Director" },
      ],
      placeholder: "Select Role",
      required: true,
    },
    {
      label: "Gender",
      type: "select",
      width: "col-md-3",
      placeholder: "Select Gender",
      key: EmployeeKeys.GENDER,
      value: modelData?.gender,
      onChange: (value: string) => handleModelData(EmployeeKeys.GENDER, value),
      options: [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
      required: true,
    },
    {
      label: "Projects To Assign",
      type: "multiSelect",
      width: "col-md-6 mt-0",
      placeholder: "Select Projects To Assign",
      key: EmployeeKeys.PROJECT,
      value: modelData?.projects! || [],
      onChange: (value: string) => handleModelData(EmployeeKeys.PROJECT, value),
      options: projectsOptions,
      required: false,
    },
    {
      label: "User Image",
      width: "col-md-3",
      type: "file",
      key: EmployeeKeys.AVATAR,
      value: modelData?.avatar,
      disabled: isEdit ? true : false,
      hide: isEdit ? true : false,
      onChange: (e: any) => {
        let avatar: File = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(avatar);
        reader.onload = (url) => {
          handleModelData(EmployeeKeys.AVATAR, avatar);
        };
      },
      placeholder: "Employee Image",
    },
  ];

  const handleReset = () => {
    setModelData({
      ...modelData,
      name: "",
      business_title: "",
      phone_number: "",
      address: "",
      shift_start: "",
      shift_end: "",
      id_number: "",
      id_ex_date: "",
      contract_date: "",
      contract_ex: "",
      salary_per_month: 0,
      site_role: "",
      site_job: "",
      joining_date: "",
      iban_number: null,
    });
  };

  const handleCreate = async () => {
    if (!modelData.gender) modelData.gender = "Male";
    let numbersToValidate = EmployeeNumKeys;
    let stringsToValidate = EmployeeStrKeys;
    let requiredToValidate = EmployeeRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    if (modelData.password && modelData.password.length < 8) {
      return showError(handleError("Password Should be 8 letters long, or leave it empty"));
    }

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);
    try {
      let createInput = employeeInput(modelData);
      await createMutation(createInput);
      showSuccess();
      push("/" + PAGES.EMPLOYEES);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleUpdate = async () => {
    let numbersToValidate = EmployeeNumKeys;
    let stringsToValidate = EmployeeStrKeys;
    let requiredToValidate = EmployeeRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    console.log({ errors });
    if (errors.length > 0) return showError(errors);

    try {
      if (errors.length > 0) return showError(errors);
      let createInput = employeeUpdateInput(modelData);
      await updateMutation({
        id: modelData.id,
        data: createInput,
      });
      showSuccess();
      push("/" + PAGES.EMPLOYEES);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation(modelData.id);
      showSuccess();
      push("/" + PAGES.EMPLOYEES);
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
                onClick={() => push("/" + PAGES.EMPLOYEES)}
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
              <Button className="lift" content="Edit" onClick={handleUpdate} />
            </>
          ) : (
            <>
              <Button className="lift" content="Create" onClick={handleCreate} />
            </>
          )}
          <Button
            className="lift"
            content="profile"
            onClick={() => push("/" + PAGES.EMPLOYEE_INFO + "/" + modelData.id)}
          />
        </div>
      </div>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={handleDelete}
        message={`Are you sure you want to delete this Employee?`}
        modalHeader={`Delete Employee`}
      />
    </div>
  );
};

export default EmployeeFormPage;
