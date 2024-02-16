import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import DocumentsDetailsContent from "components/Common/DocumentDetailsContent";
import { MaterialRequest } from "types/Material_request";
import { useMaterialRequestDetailsQuery } from "api/Documents/MaterialRequests/getMaterialRequestDetails";

interface Props {
  id?: string;
}

const MaterialRequestDetails = ({ id }: Props) => {
  const { data, error, isLoading } = useMaterialRequestDetailsQuery({ id });
  if (isLoading) return <Loading />;
  if (error) return null;

  let request: MaterialRequest = data?.materialRequestDetails.data || ({} as MaterialRequest);

  return (
    <div className="container-xxl">
      <PageHeader isBackBtn={true} />
      <div className="row g-3 py-1 pt-4">
        <DocumentsDetailsContent<MaterialRequest> data={request} />
      </div>
    </div>
  );
};

export default MaterialRequestDetails;
