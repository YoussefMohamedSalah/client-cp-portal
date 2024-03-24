import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import { useGetAllPoRequestsQuery } from "api/Documents/PoRequests/getAllPoRequests";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useEffect, useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { PurchaseOrderRequest } from "types/Po_request";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";

const FinanceApproval: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<PurchaseOrderRequest>({} as PurchaseOrderRequest);
  const [open, setOpen] = useState<boolean>(false);
  const [requests, setRequests] = useState<PurchaseOrderRequest[]>([] as PurchaseOrderRequest[]);

  const { data, error, isLoading } = useGetAllPoRequestsQuery();

  console.log("FinanceApproval", data);

  const { push } = useApp();

  const handleOpen = (request: PurchaseOrderRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { purchaseOrderColumnT } = useColumnTable(handleOpen);

  useEffect(() => {
    if (data && data.poRequests && data.poRequests.data) {
      setRequests(data.poRequests.data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return null;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader headerTitle={"Finance Approval"} />
        {/* table data */}
        <div className="test">
          <DocumentTable<PurchaseOrderRequest>
            title={"FinanceApproval"}
            columns={purchaseOrderColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: PurchaseOrderRequest) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
            isFinanceApproval={true}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<PurchaseOrderRequest>
          handleClose={handleClose}
          open={open}
          selectedDocument={selectedDocument}
        />
      )}
    </>
  );
};

export default FinanceApproval;
