import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { calculateWorkFlowStatus } from "utils/CalculateWorkFlowStatus";
import { STATUS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import DocumentsTableActionBtn from "components/Common/DocumentsTableActionBtn";
import { SiteRequest } from "types/Site_request";
import { useGetAllSiteRequestsQuery } from "api/Documents/SiteRequests/getAllSiteRequests";

const SiteRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<SiteRequest>({} as SiteRequest);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllSiteRequestsQuery();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: SiteRequest[] = [];
  if (data && data.siteRequests && data.siteRequests.data) {
    requests = data.siteRequests.data;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (request: SiteRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  let columnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code,
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.SITE_REQUEST_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
          {row.code}
        </span>
      ),
    },
    {
      name: "Rev",
      width: "80px",
      selector: (row: any) => row.rev_num!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold">{row.rev_num!}</span>,
    },
    {
      name: "Maker",
      width: "230px",
      selector: (row: any) => row.user?.name!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold">{row.user?.name!}</span>,
    },
    {
      name: "Date",
      width: "100px",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "Project",
      width: "120px",
      selector: (row: any) => row.project_details?.name!,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => <span className="">{row.description}</span>,
      sortable: false,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row: any) => row.status,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status}
              </span>
            )}
          </span>
        );
      },
    },
    {
      name: "ACTION",
      width: "120px",
      selector: (row: any) => { },
      sortable: false,
      cell: (row: any) => (
        <DocumentsTableActionBtn<SiteRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.SITE_REQUEST + "/" + row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Site Requests"}
          isBtnShow={true}
          btnText={"Create Site Request"}
          onClickBtn={() => push("/" + PAGES.SITE_REQUEST)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <DocumentTable<SiteRequest>
            title={"Site Requests"}
            columns={columnT}
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
