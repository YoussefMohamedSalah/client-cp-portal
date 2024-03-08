import { useSingleEmployeeQuery } from "api/employee/getSingleEmployee";
import ClientTaskCard from "components/Account/ClientTaskCard";
import EmployeeProfileCard from "components/Account/EmployeeProfileCard";
import PageHeader from "components/Common/PageHeader";
import Loading from "components/UI/Loading";

interface Props {
  id?: string;
}

const EmployeeDetails = ({ id }: Props) => {
  const { isLoading: employeeLoading, error: EmployeeError, data: employeeRes } = useSingleEmployeeQuery({ id });
  if (employeeLoading) return <Loading />;
  if (EmployeeError) return null;
  let employeeData: any = employeeRes?.employee?.data || {};

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Employee Profile" />
      <div className="row align-item-center row-deck g-3 mb-3">
        <div className="col-xxl-8 col-xl-8 col-lg-6 col-md-12">
          <EmployeeProfileCard user={employeeData} personal={true} />
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12">
          <ClientTaskCard />
        </div>
      </div>
    </div>
  )
};

export default EmployeeDetails;
