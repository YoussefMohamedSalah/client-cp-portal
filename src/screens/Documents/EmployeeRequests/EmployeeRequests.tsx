import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useEffect, useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { EmployeeRequest } from "types/Employee_request";
import { useGetAllEmployeeRequestsQuery } from "api/Documents/EmployeeRequests/getAllEmployeeRequests";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";

const EmployeeRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<EmployeeRequest>({} as EmployeeRequest);
  const [open, setOpen] = useState<boolean>(false);
  const [requests, setRequests] = useState<EmployeeRequest[]>([] as EmployeeRequest[])
  const { data, error, isLoading } = useGetAllEmployeeRequestsQuery();
  const { push } = useApp();

  const handleOpen = (request: EmployeeRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { employeesRequestsColumnT } = useColumnTable(handleOpen);

  useEffect(() => {
    if (data && data.empRequests && data.empRequests.data) {
      setRequests(data.empRequests.data);
    }
  }, [data])

  if (isLoading) return <Loading />;
  if (error) return null;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Employee Requests"}
          isBtnShow={!isAdminView() ? true : false}
          btnText={"Create Employee Request"}
          onClickBtn={() => push("/" + PAGES.EMPLOYEE_REQUEST)}
        />
        {/* table data */}
        <div className="test">
          <DocumentTable<EmployeeRequest>
            title={"Employee Requests"}
            columns={employeesRequestsColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: EmployeeRequest) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<EmployeeRequest>
          handleClose={handleClose}
          open={open}
          selectedDocument={selectedDocument}
        />
      )}
    </>
  );
};

export default EmployeeRequests;
