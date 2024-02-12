import Loading from "components/UI/Loading";
import { PettyCashRequest } from "types/Pc_request";
import PageHeader from "components/Common/PageHeader";
import DocumentsDetailsContent from 'components/Common/DocumentDetailsContent';
import { usePcRequestDetailsQuery } from 'api/Documents/PcRequests/getPcRequestDetails';

interface Props {
    id?: string;
};

const PcRequestDetails = ({ id }: Props) => {
    const { data, error, isLoading } = usePcRequestDetailsQuery({ id });
    if (isLoading) return <Loading />;
    if (error) return null;

    let request: PettyCashRequest = data?.pcRequestDetails.data || {} as PettyCashRequest;

    return (
        <div className="container-xxl">
            <PageHeader isBackBtn={true} />
            <div className="row g-3 py-1 pt-4">
                <DocumentsDetailsContent<PettyCashRequest> data={request} />
            </div>
        </div>
    )
}

export default PcRequestDetails
