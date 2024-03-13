import Loading from "components/UI/Loading";
import { PettyCashRequest } from "types/Pc_request";
import DocumentTable from "components/Common/DocumentTable";
import { useGetAllPcRequestsQuery } from "api/Documents/PcRequests/getAllPcRequests";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";

const PcRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<PettyCashRequest>({} as PettyCashRequest);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllPcRequestsQuery();
  const { push } = useApp();

  const handleOpen = (request: PettyCashRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { pettyCashColumnT } = useColumnTable(handleOpen);

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: PettyCashRequest[] = [];
  if (data?.pcRequests?.data!) requests = data.pcRequests.data;

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Petty cash Requests"}
          isBtnShow={!isAdminView() ? true : false}
          btnText={"Create PC"}
          onClickBtn={() => push("/" + PAGES.PC_REQUEST)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <DocumentTable<PettyCashRequest>
            title={"Petty cash Requests"}
            columns={pettyCashColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: PettyCashRequest) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<PettyCashRequest>
          handleClose={handleClose}
          open={open}
          selectedDocument={selectedDocument}
        />
      )}
    </>
  );
};

export default PcRequests;
