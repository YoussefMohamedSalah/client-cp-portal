import { useEffect, useState } from "react";
import { STATUS } from "enums/enums";
import SmallCard, { SmallCardProps } from "components/UI/SmallCard";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";

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

function TableCards<
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  let allData = data || [];
  let archived = data?.filter((row) => row?.status! === STATUS.ARCHIVED) || [];
  let approved = data?.filter((row) => row?.status! === STATUS.APPROVED) || [];
  let pending = data?.filter((row) => row?.status! === STATUS.PENDING) || [];
  let rejected = data?.filter((row) => row?.status! === STATUS.REJECTED) || [];

  const handleFilter = (term: string) => {
    switch (term) {
      case STATUS.ARCHIVED:
        return setFilterData(archived);
      case STATUS.APPROVED:
        return setFilterData(approved);
      case STATUS.PENDING:
        return setFilterData(pending);
      case STATUS.REJECTED:
        return setFilterData(rejected);
      default:
        return setFilterData(allData);
    }
  };

  const cardsData: SmallCardProps[] = [
    {
      title: "All",
      fColor: "text-white",
      bgColor: "bg-info",
      value: `Data Count: ${allData.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter("All"),
    },
    {
      title: "Archived",
      fColor: "text-white",
      bgColor: "bg-black",
      value: `Data Count: ${archived.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(STATUS.ARCHIVED),
    },
    {
      title: "Approved",
      fColor: "text-white",
      bgColor: "bg-success",
      value: `Data Count: ${approved.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(STATUS.APPROVED),
    },
    {
      title: "Pending",
      fColor: "text-white",
      bgColor: "bg-primary",
      value: `Data Count: ${pending.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(STATUS.PENDING),
    },
    {
      title: "Rejected",
      fColor: "text-white",
      bgColor: "bg-danger",
      value: `Data Count: ${rejected.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(STATUS.REJECTED),
    },
  ];

  return (
    <div className="row g-3 mb-2 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5 m-0">
      {cardsData.map((card, index: number) => {
        return (
          <span key={index}>
            <SmallCard
              title={card.title}
              bgColor={card.bgColor}
              fColor={card.fColor}
              value={card.value}
              iconClass={card.iconClass}
              onClick={card.onClick}
            />
          </span>
        );
      })}
    </div>
  );
}

export default TableCards;
