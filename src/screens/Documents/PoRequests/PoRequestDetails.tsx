import Loading from "components/UI/Loading";
import { PurchaseOrderRequest } from "types/Po_request";
import PageHeader from "components/Common/PageHeader";
import { usePoRequestDetailsQuery } from "api/Documents/PoRequests/getPoRequestDetails";
import DocumentsDetailsContent from "components/Common/DocumentDetailsContent";

interface Props {
  id?: string;
}

const PoRequestDetails = ({ id }: Props) => {
  const { data, error, isLoading } = usePoRequestDetailsQuery({ id });
  if (isLoading) return <Loading />;
  if (error) return null;

  let request: PurchaseOrderRequest = data?.poRequestDetails.data || ({} as PurchaseOrderRequest);

  return (
    <div className="container-xxl">
      <PageHeader isBackBtn={true} />
      <div className="row g-3 py-1 pt-4">
        <DocumentsDetailsContent<PurchaseOrderRequest> data={request} />
      </div>
    </div>
  );
};

export default PoRequestDetails;
