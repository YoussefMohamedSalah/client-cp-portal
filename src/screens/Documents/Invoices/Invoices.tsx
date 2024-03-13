import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { Invoice } from "types/Invoice";
import { useGetAllInvoicesQuery } from "api/Documents/Invoices/getAllInvoices";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";


const Invoiced: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Invoice>({} as Invoice);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllInvoicesQuery();
  const { push } = useApp();

  const handleOpen = (request: Invoice) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { invoiceColumnT } = useColumnTable(handleOpen);

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: Invoice[] = [];
  if (data && data.invoices && data.invoices.data) {
    requests = data.invoices.data;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Payment Certificates"}
          isBtnShow={!isAdminView() ? true : false}
          btnText={"Create Payment Certificate"}
          onClickBtn={() => push("/" + PAGES.INVOICE)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <DocumentTable<Invoice>
            title={"Payment Certificates"}
            columns={invoiceColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: Invoice) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<Invoice> handleClose={handleClose} open={open} selectedDocument={selectedDocument} />
      )}
    </>
  );
};

export default Invoiced;
