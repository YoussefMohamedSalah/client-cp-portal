import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import DocumentsDetailsContent from "components/Common/DocumentDetailsContent";
import { Contract } from "types/Contract";
import { useContractDetailsQuery } from "api/Documents/Contracts/getContractDetails";

interface Props {
  id?: string;
}

const ContractDetails = ({ id }: Props) => {
  const { data, error, isLoading } = useContractDetailsQuery({ id });
  if (isLoading) return <Loading />;
  if (error) return null;

  let request: Contract = data?.contractDetails.data || ({} as Contract);

  return (
    <div className="container-xxl">
      <PageHeader isBackBtn={true} />
      <div className="row g-3 py-1 pt-4">
        <DocumentsDetailsContent<Contract> data={request} />
      </div>
    </div>
  );
};

export default ContractDetails;
