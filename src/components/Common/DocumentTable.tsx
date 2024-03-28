import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DownloadCSV from "components/UI/DownloadCSV";
import TableCards from "./TableCards";
import TableSearch from "./TableSearch";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { formatDocumentCsvOutput } from "utils/FormatDocumentCsvOutput";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";
import { formatCsvTitle } from "utils/FormatCsvTitle";
import FinancialCards from "./FinancialCards";

interface Props<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice,
> {
  title: string;
  columns: any;
  data: T[];
  defaultSortFieldId?: number;
  pagination?: boolean;
  selectableRows?: boolean;
  className?: string;
  highlightOnHover?: boolean;
  renderCards: boolean;
  renderSearch: boolean;
  renderDownload: boolean;
  filterOptions?: string[];
  selectItem?: (item: T) => void;
  isFinanceApproval?: boolean;
}

function DocumentTable<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice,
>({
  title,
  columns,
  data,
  defaultSortFieldId,
  pagination,
  selectableRows,
  className,
  highlightOnHover,
  renderCards,
  renderSearch,
  renderDownload,
  filterOptions,
  selectItem,
  isFinanceApproval,
}: Props<T>) {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const onCardsFilter = (filtered: T[]) => setFilteredData(filtered);
  const onSearchFilter = (filtered: T[]) => setFilteredData(filtered);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  let csvData =
    formatDocumentCsvOutput<
      PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice
    >(filteredData || data) || [];
  let fileName = data[0]?.code?.split("-")?.[0]! || "data";

  return (
    <div className="row clearfix g-3">
      {/* Cards Filters */}

      {renderCards && !isFinanceApproval && <TableCards data={data} onFilter={onCardsFilter} />}
      <div className="d-flex flex-column flex-lg-row justify-content-xl-between justify-content-center">
        {/* Download as a CSV */}
        {renderDownload && <DownloadCSV fileName={formatCsvTitle(fileName)} csvData={csvData} />}
        {/* Search Input */}
        {renderSearch && (
          <TableSearch
            data={data}
            terms={filterOptions || []}
            classNameContainer={true}
            onSearchFilter={onSearchFilter}
          />
        )}
      </div>
      {isFinanceApproval && <FinancialCards data={data} onFilter={onCardsFilter} />}
      {/* TABLE */}
      <div className="col-sm-12">
        <DataTable
          title={title}
          columns={columns}
          data={filteredData || data}
          defaultSortFieldId={defaultSortFieldId || 1}
          pagination={pagination || true}
          selectableRows={selectableRows || false}
          className={
            className || "table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
          }
          highlightOnHover={highlightOnHover || true}
        />
      </div>
    </div>
  );
}

export default DocumentTable;
