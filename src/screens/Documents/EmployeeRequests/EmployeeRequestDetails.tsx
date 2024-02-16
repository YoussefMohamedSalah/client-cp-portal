import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import DocumentsDetailsContent from "components/Common/DocumentDetailsContent";
import { EmployeeRequest } from "types/Employee_request";
import { useEmployeeRequestDetailsQuery } from "api/Documents/EmployeeRequests/getEmployeeRequestDetails";

interface Props {
  id?: string;
}

const EmployeeRequestDetails = ({ id }: Props) => {
  const { data, error, isLoading } = useEmployeeRequestDetailsQuery({ id });
  if (isLoading) return <Loading />;
  if (error) return null;

  let request: EmployeeRequest = data?.employeeRequestDetails.data || ({} as EmployeeRequest);

  return (
    <div className="container-xxl">
      <PageHeader isBackBtn={true} />
      <div className="row g-3 py-1 pt-4">
        <DocumentsDetailsContent<EmployeeRequest> data={request} />
      </div>
    </div>
  );
};

export default EmployeeRequestDetails;
