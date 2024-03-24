import { useEffect, useState } from "react";
import { STATUS } from "enums/enums";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";
import Button from "components/UI/Button";

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
  data: T[];
  onFilter: (filtered: T[]) => void;
}

function FinancialCards<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice,
>({ data, onFilter }: Props<T>) {
  const [filterData, setFilterData] = useState<T[]>(data || []);

  useEffect(() => {
    onFilter(filterData);
  }, [filterData]);

  let allData = data || [];
  let approved = data?.filter((row) => row?.status! === STATUS.APPROVED) || [];
  let rejected = data?.filter((row) => row?.status! === STATUS.REJECTED) || [];

  const handleFilter = (term: string) => {
    switch (term) {
      case STATUS.APPROVED:
        return setFilterData(approved);
      case STATUS.REJECTED:
        return setFilterData(rejected);
      default:
        return setFilterData(allData);
    }
  };

  return (
    <div className="container">
      <div className="row mt-3 align-items-center justify-content-center">
        <Button content="All" className="py-2 col-md-2 col-sm-6 col-7 me-3 my-2" onClick={() => handleFilter("All")} />
        <Button
          content="Approved"
          variant="success"
          onClick={() => handleFilter(STATUS.APPROVED)}
          className="py-2 col-md-2 col-sm-6 col-7 me-3 my-2 text-white"
        />
        <Button
          content="Rejected"
          variant="danger"
          onClick={() => handleFilter(STATUS.REJECTED)}
          className="py-2 col-md-2 col-sm-6 col-7 me-3 my-2 text-white"
        />
      </div>
    </div>
  );
}

export default FinancialCards;
