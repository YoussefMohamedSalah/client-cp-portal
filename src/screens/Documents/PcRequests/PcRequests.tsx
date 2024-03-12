import Loading from "components/UI/Loading";
import { PettyCashRequest } from "types/Pc_request";
import DocumentTable from "components/Common/DocumentTable";
import { useGetAllPcRequestsQuery } from "api/Documents/PcRequests/getAllPcRequests";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { calculateWorkFlowStatus } from "utils/CalculateWorkFlowStatus";
import { STATUS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import DocumentsTableActionBtn from "components/Common/DocumentsTableActionBtn";
import { isAdminView } from "utils/Helpers";

const PcRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<PettyCashRequest>({} as PettyCashRequest);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllPcRequestsQuery();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: PettyCashRequest[] = [];
  if (data?.pcRequests?.data!) requests = data.pcRequests.data;

  const handleClose = () => setOpen(false);

  const handleOpen = (request: PettyCashRequest) => {
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
        <span onClick={() => push(`/${PAGES.PC_REQUEST_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
          {row.code}
        </span>
      ),
    },
    {
      name: "Rev",
      width: "70px",
      selector: (row: any) => row.rev_num!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold">{row.rev_num!}</span>,
    },
    {
      name: "Maker",
      width: "220px",
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
      width: "270px",
      selector: (row: any) => <span className="">{row.description}</span>,
      sortable: false,
    },
    {
      name: "Transaction Date",
      width: "160px",
      selector: (row: any) => row.transaction_date,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => `${Number(row.total).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Paid",
      selector: (row: any) => `${Number(row.paid_amount).toFixed(2) || 0} SAR`,
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
        <DocumentsTableActionBtn<PettyCashRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.PC_REQUEST + "/" + row.id)}
        />
      ),
    },
  ];

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
            columns={columnT}
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
