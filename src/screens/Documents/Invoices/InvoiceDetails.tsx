import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import DocumentsDetailsContent from 'components/Common/DocumentDetailsContent';
import { Invoice } from "types/Invoice";
import { useInvoiceDetailsQuery } from "api/Documents/Invoices/getInvoiceDetails";

interface Props {
    id?: string;
};

const InvoiceDetails = ({ id }: Props) => {
    const { data, error, isLoading } = useInvoiceDetailsQuery({ id });
    if (isLoading) return <Loading />;
    if (error) return null;

    let request: Invoice = data?.invoiceDetails.data || {} as Invoice;

    return (
        <div className="container-xxl">
            <PageHeader isBackBtn={true} />
            <div className="row g-3 py-1 pt-4">
                <DocumentsDetailsContent<Invoice> data={request} />
            </div>
        </div>
    )
}

export default InvoiceDetails
