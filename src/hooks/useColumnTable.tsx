import DocumentsTableActionBtn from "components/Common/DocumentsTableActionBtn";
import { PAGES } from "constants/pages";
import { getShortString } from "utils/Helpers";
import useApp from "./useApp";
import { calculateWorkFlowStatus } from "utils/CalculateWorkFlowStatus";
import { STATUS } from "enums/enums";
import { Contract } from "types/Contract";
import { PettyCashRequest } from "types/Pc_request";
import { SiteRequest } from "types/Site_request";
import { MaterialRequest } from "types/Material_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { Invoice } from "types/Invoice";
import { EmployeeRequest } from "types/Employee_request";

const useColumnTable = (handleOpen: (row: any) => void) => {
  const { push } = useApp();

  const contractColumnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code!,
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.CONTRACT_INFO}/${row.id!}`)} className="fw-bold text-secondary pointer">
          {row.code!}
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
      name: "Subject",
      width: "210px",
      selector: (row: any) => row.subject!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold">{getShortString(`${row.subject!}`, 25)!}</span>,
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
      selector: (row: any) => row.date!,
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
      selector: (row: any) => <span className="">{row.description!}</span>,
      sortable: false,
    },
    {
      name: "Transaction Date",
      width: "160px",
      selector: (row: any) => row.transaction_date!,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => `${Number(row.total!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Paid",
      selector: (row: any) => `${Number(row.paid_amount!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row: any) => row.status!,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow!);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status! === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status!}
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
        <DocumentsTableActionBtn<Contract> data={row} onClickEdit={() => push("/" + PAGES.CONTRACT + "/" + row.id!)} />
      ),
    },
  ];

  const employeesRequestsColumnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code!,
      sortable: true,
      cell: (row: any) => (
        <span
          onClick={() => push(`/${PAGES.EMPLOYEE_REQUEST_INFO}/${row.id!}`)}
          className="fw-bold text-secondary pointer">
          {row.code!}
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
      selector: (row: any) => row.date!,
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
      selector: (row: any) => <span className="">{row.description!}</span>,
      sortable: false,
    },
    {
      name: "Transaction Date",
      width: "160px",
      selector: (row: any) => row.transaction_date!,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => `${Number(row.total!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Paid",
      selector: (row: any) => `${Number(row.paid_amount!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row: any) => row.status!,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow!);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status! === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status!}
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
        <DocumentsTableActionBtn<EmployeeRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.EMPLOYEE_REQUEST + "/" + row.id!)}
        />
      ),
    },
  ];

  const pettyCashColumnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code!,
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.PC_REQUEST_INFO}/${row.id!}`)} className="fw-bold text-secondary pointer">
          {row.code!}
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
      selector: (row: any) => row.date!,
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
      selector: (row: any) => <span className="">{row.description!}</span>,
      sortable: false,
    },
    {
      name: "Transaction Date",
      width: "160px",
      selector: (row: any) => row.transaction_date!,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => `${Number(row.total!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Paid",
      selector: (row: any) => `${Number(row.paid_amount!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row: any) => row.status!,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow!);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status! === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status!}
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
        <DocumentsTableActionBtn<PettyCashRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.PC_REQUEST + "/" + row.id!)}
        />
      ),
    },
  ];

  const invoiceColumnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code!,
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.INVOICE_INFO}/${row.id!}`)} className="fw-bold text-secondary pointer">
          {row.code!}
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
      selector: (row: any) => row.date!,
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
      selector: (row: any) => <span className="">{row.description!}</span>,
      sortable: false,
    },
    {
      name: "Transaction Date",
      width: "160px",
      selector: (row: any) => row.transaction_date!,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: any) => `${Number(row.total!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Paid",
      selector: (row: any) => `${Number(row.paid_amount!).toFixed(2) || 0} SAR`,
      sortable: false,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row: any) => row.status!,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow!);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status! === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status!}
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
        <DocumentsTableActionBtn<Invoice> data={row} onClickEdit={() => push("/" + PAGES.INVOICE + "/" + row.id!)} />
      ),
    },
  ];

  const siteColumnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code!,
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.SITE_REQUEST_INFO}/${row.id!}`)} className="fw-bold text-secondary pointer">
          {row.code!}
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
      selector: (row: any) => row.date!,
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
      selector: (row: any) => <span className="">{row.description!}</span>,
      sortable: false,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row: any) => row.status!,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow!);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status! === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status!}
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
        <DocumentsTableActionBtn<SiteRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.SITE_REQUEST + "/" + row.id!)}
        />
      ),
    },
  ];

  const purchaseOrderColumnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code!,
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.PO_REQUEST_INFO}/${row.id!}`)} className="fw-bold text-secondary pointer">
          {row.code!}
        </span>
      ),
    },
    {
      name: "Date",
      width: "100px",
      selector: (row: any) => row.date!,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row: any) => row.project_details?.name!,
      sortable: true,
      cell: (row: any) => <span className="fw-bold ms-1">{row.project_details?.name!}</span>,
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
      selector: (row: any) => <span className="">{row.description!}</span>,
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
      selector: (row: any) => row.status!,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow!);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status! === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status!}
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
      selector: (row: any) => `${Number(row.total!).toFixed(2) || 0} SAR`,
      sortable: true,
    },
    {
      name: "Paid",
      width: "110px",
      selector: (row: any) => `${Number(row.paid_amount!).toFixed(2) || 0} SAR`,
      sortable: true,
    },
    {
      name: "ACTION",
      selector: (row: any) => {},
      sortable: false,
      cell: (row: any) => (
        <DocumentsTableActionBtn<PurchaseOrderRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.PO_REQUEST + "/" + row.id!)}
        />
      ),
    },
  ];

  const materialColumnT: any[] = [
    {
      name: "Code",
      width: "110px",
      selector: (row: any) => row.code!,
      sortable: true,
      cell: (row: any) => (
        <span
          onClick={() => push(`/${PAGES.MATERIAL_REQUEST_INFO}/${row.id!}`)}
          className="fw-bold text-secondary pointer">
          {row.code!}
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
      selector: (row: any) => row.date!,
      sortable: true,
    },
    {
      name: "Project",
      width: "120px",
      selector: (row: any) => row.project_details?.name!,
      sortable: true,
    },
    {
      name: "Subject",
      width: "210px",
      selector: (row: any) => <span className="">{getShortString(`${row.subject}`, 25)}</span>,
      sortable: false,
    },
    {
      name: "Description",
      width: "390px",
      selector: (row: any) => <span className="">{row.description!}</span>,
      sortable: false,
    },
    {
      name: "Status",
      width: "100px",
      selector: (row: any) => row.status!,
      sortable: true,
      cell: (row: any) => {
        let gradient = calculateWorkFlowStatus(row.work_flow!);
        return (
          <span className="pointer" onClick={() => handleOpen(row)}>
            {row.status! === STATUS.ARCHIVED ? (
              <span className="badge bg-black text-white">Archived</span>
            ) : (
              <span className="badge text-black" style={{ background: gradient }}>
                {row.status!}
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
        <DocumentsTableActionBtn<MaterialRequest>
          data={row}
          onClickEdit={() => push("/" + PAGES.MATERIAL_REQUEST + "/" + row.id!)}
        />
      ),
    },
  ];

  return {
    contractColumnT: contractColumnT,
    pettyCashColumnT: pettyCashColumnT,
    invoiceColumnT: invoiceColumnT,
    siteColumnT: siteColumnT,
    purchaseOrderColumnT: purchaseOrderColumnT,
    materialColumnT: materialColumnT,
    employeesRequestsColumnT: employeesRequestsColumnT,
  };
};

export default useColumnTable;
