import ClientTaskCard from "components/Account/ClientTaskCard";
import EmployeeProfileCard from "components/Account/EmployeeProfileCard";
import PageHeader from "components/Common/PageHeader";
import Loading from "components/UI/Loading";
import { Employee } from "types/Employee";
import { DataArrayType } from "components/Account/EmployeeProfileCard";
import { useEmployeeDetailsQuery } from "api/Employees/getEmployeeDetails";

interface Props {
  id?: string;
}

const EmployeeDetails = ({ id }: Props) => {
  const { isLoading: employeeLoading, error: EmployeeError, data: employeeData } = useEmployeeDetailsQuery({ id });
  if (employeeLoading) return <Loading />;
  if (EmployeeError) return null;
  let employee: Employee = employeeData?.employee?.data || {} as Employee;

  const {
    name,
    email,
    phone_number,
    business_title,
    address,
    gender,
    shift_start,
    shift_end,
    contract_date,
    contract_ex,
    role,
    department_info,
    nationality,
    site_role,
    site_job,
    joining_date } = employee;

  const dataArr: DataArrayType[] = [
    { iconClass: "icofont-briefcase", label: "Name", value: name },
    { iconClass: "icofont-ui-touch-phone", label: "Nationality", value: nationality },
    { iconClass: "icofont-ui-touch-phone", label: "Phone number", value: phone_number },
    { iconClass: "icofont-ui-touch-phone", label: "Site role", value: site_role },
    { iconClass: "icofont-ui-touch-phone", label: "Site job", value: site_job },
    { iconClass: "icofont-ui-touch-phone", label: "Shift start", value: shift_start },
    { iconClass: "icofont-ui-touch-phone", label: "Shift end", value: shift_end },
    { iconClass: "icofont-ui-touch-phone", label: "Role", value: role },
    { iconClass: "icofont-flag", label: "Business title", value: business_title },
    { iconClass: "icofont-building", label: "Address", value: address },
    { iconClass: "icofont-road", label: "Gender", value: gender },
    { iconClass: "icofont-building", label: "Contract Data", value: contract_date },
    { iconClass: "icofont-building", label: "Contract expiration data", value: contract_ex },
    { iconClass: "icofont-email", label: "Email", value: email },
    { iconClass: "icofont-address-book", label: "Department", value: department_info?.name! },
    { iconClass: "icofont-ui-calendar", label: "Join date", value: new Date(joining_date).toLocaleDateString() },
  ]

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Employee Profile" isBackBtn={true} />
      <div className="row align-item-center row-deck g-3 mb-3">
        <div className="col-xxl-8 col-xl-8 col-lg-6 col-md-12">
          <EmployeeProfileCard employee={employee} personal={false} dataArr={dataArr} />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12">
          <ClientTaskCard />
        </div>
      </div>
    </div>
  )
};

export default EmployeeDetails;
