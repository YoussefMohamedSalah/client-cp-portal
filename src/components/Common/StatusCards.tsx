import { useEffect, useState } from "react";
import { TODO } from "enums/enums";
import SmallCard, { SmallCardProps } from "components/UI/SmallCard";
import { PettyCashRequest } from "types/Pc_request";
import { PurchaseOrderRequest } from "types/Po_request";
import { EmployeeRequest } from "types/Employee_request";
import { MaterialRequest } from "types/Material_request";
import { SiteRequest } from "types/Site_request";
import { Contract } from "types/Contract";
import { Invoice } from "types/Invoice";
import { Todo } from "types/Todo";

interface Props<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice
    | Todo,
> {
  data: T[];
  onFilter: (filtered: T[]) => void;
}

function StatusCards<
  T extends
    | PettyCashRequest
    | PurchaseOrderRequest
    | EmployeeRequest
    | MaterialRequest
    | SiteRequest
    | Contract
    | Invoice
    | Todo,
>({ data, onFilter }: Props<T>) {
  const [filterData, setFilterData] = useState<T[]>(data || []);
  useEffect(() => {
    onFilter(filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  let allData = data || [];
  let done = data?.filter((row) => row?.status! === TODO.DONE) || [];
  let onProgress = data?.filter((row) => row?.status! === TODO.ON_PROGRESS) || [];
  let pending = data?.filter((row) => row?.status! === TODO.PENDING) || [];
  let toDo = data?.filter((row) => row?.status! === TODO.TODO) || [];

  const handleFilter = (term: string) => {
    switch (term) {
      case TODO.DONE:
        return setFilterData(done);
      case TODO.ON_PROGRESS:
        return setFilterData(onProgress);
      case TODO.PENDING:
        return setFilterData(pending);
      case TODO.TODO:
        return setFilterData(toDo);
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
      title: "Done",
      fColor: "text-white",
      bgColor: "bg-info",
      value: `Data Count: ${done.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(TODO.DONE),
    },
    {
      title: "Todo",
      fColor: "text-white",
      bgColor: "bg-black",
      value: `Data Count: ${toDo.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(TODO.TODO),
    },
    {
      title: "On progress",
      fColor: "text-white",
      bgColor: "bg-success",
      value: `Data Count: ${onProgress.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(TODO.ON_PROGRESS),
    },
    {
      title: "Pending",
      fColor: "text-white",
      bgColor: "bg-primary",
      value: `Data Count: ${pending.length || 0}`,
      iconClass: "icofont-data fs-3",
      onClick: () => handleFilter(TODO.PENDING),
    },
  ];

  return (
    <div className="row g-3 mb-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5">
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

export default StatusCards;
