import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import { useGetAllPoRequestsQuery } from "api/Documents/PoRequests/getAllPoRequests";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { PurchaseOrderRequest } from "types/Po_request";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";

const PoRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<PurchaseOrderRequest>({} as PurchaseOrderRequest);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllPoRequestsQuery();
  const { push } = useApp();

  const handleOpen = (request: PurchaseOrderRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { purchaseOrderColumnT } = useColumnTable(handleOpen);

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: PurchaseOrderRequest[] = [];
  if (data && data.poRequests && data.poRequests.data) {
    requests = data.poRequests.data;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Purchase Order Requests"}
          isBtnShow={!isAdminView() ? true : false}
          btnText={"Create PO"}
          onClickBtn={() => push("/" + PAGES.PO_REQUEST)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <DocumentTable<PurchaseOrderRequest>
            title={"Purchase Order Requests"}
            columns={purchaseOrderColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: PurchaseOrderRequest) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
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

export default PoRequests;
