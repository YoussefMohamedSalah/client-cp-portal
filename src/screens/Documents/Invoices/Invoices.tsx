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
import { Invoice } from "types/Invoice";
import { useGetAllInvoicesQuery } from "api/Documents/Invoices/getAllInvoices";
import { isAdminView } from "utils/Helpers";

const Invoiced: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Invoice>({} as Invoice);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllInvoicesQuery();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: Invoice[] = [];
  if (data && data.invoices && data.invoices.data) {
    requests = data.invoices.data;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (request: Invoice) => {
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
        <span onClick={() => push(`/${PAGES.INVOICE_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
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
      selector: (row: any) => {},
      sortable: false,
      cell: (row: any) => (
        <DocumentsTableActionBtn<Invoice> data={row} onClickEdit={() => push("/" + PAGES.INVOICE + "/" + row.id)} />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Payment Certificates"}
          isBtnShow={isAdminView() ? true : false}
          btnText={"Create Payment Certificate"}
          onClickBtn={() => push("/" + PAGES.INVOICE)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <DocumentTable<Invoice>
            title={"Payment Certificates"}
            columns={columnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: Invoice) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<Invoice> handleClose={handleClose} open={open} selectedDocument={selectedDocument} />
      )}
    </>
  );
};

export default Invoiced;
