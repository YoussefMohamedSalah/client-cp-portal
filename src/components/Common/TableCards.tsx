import { useEffect, useState } from 'react';
import { ENUMS } from '@/enums/enums';
import SmallCard from '@/components/UI/SmallCard';
import PettyCashRequest from '@/types/Pc_request';
import PurchaseOrderRequest from "@/types/Po_request";
import EmployeeRequest from "@/types/Employee_request";
import MaterialRequest from "@/types/Material_request";
import SiteRequest from "@/types/Site_request";
import { Contract } from '@/types/Contract';
import Invoice from '@/types/Invoice';

interface SmallCardProps {
	title: string;
	color: string;
	value: any;
	iconClass: string;
	onClick: () => void;
};

interface Props<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice> {
	data: T[];
	onFilter: (filtered: T[]) => void;
};

function TableCards<T extends PettyCashRequest | PurchaseOrderRequest | EmployeeRequest | MaterialRequest | SiteRequest | Contract | Invoice>({ data, onFilter }: Props<T>) {
	const [filterData, setFilterData] = useState<T[]>(data);

	useEffect(() => {
		onFilter(filterData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterData])

	let allData = data || [];
	let archived = data?.filter((row) => row?.status === ENUMS.STATUS.ARCHIVED) || [];
	let approved = data?.filter((row) => row?.status === ENUMS.STATUS.APPROVED) || [];
	let pending = data?.filter((row) => row?.status === ENUMS.STATUS.PENDING) || [];
	let rejected = data?.filter((row) => row?.status === ENUMS.STATUS.REJECTED) || [];

	const handleFilter = (term: string) => {
		switch (term) {
			case ENUMS.STATUS.ARCHIVED:
				return setFilterData(archived);
			case ENUMS.STATUS.APPROVED:
				return setFilterData(approved);
			case ENUMS.STATUS.PENDING:
				return setFilterData(pending);
			case ENUMS.STATUS.REJECTED:
				return setFilterData(rejected);
			default:
				return setFilterData(allData);
		}
	};

	const cardsData: SmallCardProps[] = [
		{
			title: "All",
			color: "bg-info",
			value: `Data Count: ${allData.length || 0}`,
			iconClass: "icofont-data fs-3",
			onClick: () => handleFilter("All")
		},
		{
			title: "Archived",
			color: "bg-black",
			value: `Data Count: ${archived.length || 0}`,
			iconClass: "icofont-data fs-3",
			onClick: () => handleFilter(ENUMS.STATUS.ARCHIVED)
		},
		{
			title: "Approved",
			color: "bg-success",
			value: `Data Count: ${approved.length || 0}`,
			iconClass: "icofont-data fs-3",
			onClick: () => handleFilter(ENUMS.STATUS.APPROVED)
		},
		{
			title: "Pending",
			color: "bg-primary",
			value: `Data Count: ${pending.length || 0}`,
			iconClass: "icofont-data fs-3",
			onClick: () => handleFilter(ENUMS.STATUS.PENDING)
		},
		{
			title: "Rejected",
			color: "bg-danger",
			value: `Data Count: ${rejected.length || 0}`,
			iconClass: "icofont-data fs-3",
			onClick: () => handleFilter(ENUMS.STATUS.REJECTED)
		}
	];

	return (
		<div className="row g-3 mb-3 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-5 row-cols-xl-5 row-cols-xxl-5">
			{cardsData.map((card, index: number) => {
				return (
					<span key={index}>
						<SmallCard
							title={card.title}
							backgroundColor={card.color}
							value={card.value}
							iconClass={card.iconClass}
							onClick={card.onClick}
						/>
					</span>
				)
			})}
		</div>
	)
}

export default TableCards;
