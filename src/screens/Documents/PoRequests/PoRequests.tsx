import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import { useGetAllPoRequestsQuery } from "api/Documents/PoRequests/getAllPoRequests";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { calculateWorkFlowStatus } from "utils/CalculateWorkFlowStatus";
import { STATUS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import DocumentsTableActionBtn from "components/Common/DocumentsTableActionBtn";
import { PurchaseOrderRequest } from "types/Po_request";

const PoRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<PurchaseOrderRequest>({} as PurchaseOrderRequest);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllPoRequestsQuery();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: PurchaseOrderRequest[] = [];
  if (data && data.poRequests && data.poRequests.data) {
    requests = data.poRequests.data;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (request: PurchaseOrderRequest) => {
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
        <span onClick={() => push(`/${PAGES.PO_REQUEST_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
          {row.code}
        </span>
      ),
    },
    {
      name: "Date",
      width: "100px",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row: any) => row.project_details.name!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold ms-1">{row.project_details.name!}</span>,
    },
    {
      name: "Rev",
      width: "70px",
      selector: (row: any) => row.rev_num!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold ms-1">{row.rev_num!}</span>,
    },
    {
      name: "User",
      width: "200px",
      selector: (row: any) => row.user?.name!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold ms-1">{row.user?.name!}</span>,
    },
    {
      name: "Description",
      width: "240px",
      selector: (row: any) => <span className="">{row.description}</span>,
      sortable: false,
    },
    {
      name: "Supplier",
      width: "120px",
      selector: (row: any) => row.supplier_details?.name!,
      sortable: true,
    },

    {
      name: "D.Date",
      width: "100px",
      selector: (row: any) => row.delivery_date,
      sortable: true,
    },
    {
      name: "D.Feedback",
      width: "120px",
      selector: (row: any) => row.delivery_date,
      sortable: true,
    },
    {
      name: "T.Date",
      width: "100px",
      selector: (row: any) => row.delivery_date,
      sortable: true,
    },
    {
      name: "Status",
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
      name: "Vat",
      selector: (row: any) => `${Number(row.vat).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "P.Type",
      selector: (row: any) => row.payment_type,
      sortable: true,
    },
    {
      name: "Sub Total",
      width: "110px",
      selector: (row: any) => `${Number(row.sub_total).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Total",
      width: "110px",
      selector: (row: any) => `${Number(row.total).toFixed(2) || 0} SAR`,
      sortable: true,
    },
    {
      name: "Paid",
      width: "110px",
      selector: (row: any) => `${Number(row.paid_amount).toFixed(2) || 0} SAR`,
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row: any) => { },
      sortable: false,
      cell: (row: any) => (
        <DocumentsTableActionBtn<PurchaseOrderRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.PO_REQUEST + "/" + row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Purchase Order Requests"}
          isBtnShow={true}
          btnText={"Create PC"}
          onClickBtn={() => push("/" + PAGES.PO_REQUEST)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <DocumentTable<PurchaseOrderRequest>
            title={"Purchase Order Requests"}
            columns={columnT}
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
