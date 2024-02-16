import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import DocumentsDetailsContent from "components/Common/DocumentDetailsContent";
import { SiteRequest } from "types/Site_request";
import { useSiteRequestDetailsQuery } from "api/Documents/SiteRequests/getSiteRequestDetails";

interface Props {
  id?: string;
}

const SiteRequestDetails = ({ id }: Props) => {
  const { data, error, isLoading } = useSiteRequestDetailsQuery({ id });
  if (isLoading) return <Loading />;
  if (error) return null;

  let request: SiteRequest = data?.siteRequestDetails.data || ({} as SiteRequest);

  return (
    <div className="container-xxl">
      <PageHeader isBackBtn={true} />
      <div className="row g-3 py-1 pt-4">
        <DocumentsDetailsContent<SiteRequest> data={request} />
      </div>
    </div>
  );
};

export default SiteRequestDetails;
