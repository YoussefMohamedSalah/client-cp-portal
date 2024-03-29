import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useEffect, useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { SiteRequest } from "types/Site_request";
import { useGetAllSiteRequestsQuery } from "api/Documents/SiteRequests/getAllSiteRequests";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";

const SiteRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<SiteRequest>({} as SiteRequest);
  const [open, setOpen] = useState<boolean>(false);
  const [requests, setRequests] = useState<SiteRequest[]>([] as SiteRequest[]);
  const { data, error, isLoading } = useGetAllSiteRequestsQuery();
  const { push } = useApp();

  const handleOpen = (request: SiteRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { siteColumnT } = useColumnTable(handleOpen);

  useEffect(() => {
    if (data && data.siteRequests && data.siteRequests.data) {
      setRequests(data.siteRequests.data);
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
        <PageHeader
          headerTitle={"Site Requests"}
          isBtnShow={!isAdminView() ? true : false}
          btnText={"Create Site Request"}
          onClickBtn={() => push("/" + PAGES.SITE_REQUEST)}
        />
        {/* table data */}
        <div className="test">
          <DocumentTable<SiteRequest>
            title={"Site Requests"}
            columns={siteColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: SiteRequest) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<SiteRequest> handleClose={handleClose} open={open} selectedDocument={selectedDocument} />
      )}
    </>
  );
};

export default SiteRequests;
