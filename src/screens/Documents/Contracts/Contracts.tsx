import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { Contract } from "types/Contract";
import { useGetAllContractsQuery } from "api/Documents/Contracts/getAllContracts";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";

const Contracts: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Contract>({} as Contract);
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useGetAllContractsQuery();
  const { push } = useApp();

  const handleOpen = (request: Contract) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { contractColumnT } = useColumnTable(handleOpen);

  if (isLoading) return <Loading />;
  if (error) return null;

  let requests: Contract[] = [];
  if (data && data.contracts && data.contracts.data) {
    requests = data.contracts.data;
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Contracts"}
          isBtnShow={!isAdminView() ? true : false}
          btnText={"Create Contract"}
          onClickBtn={() => push("/" + PAGES.CONTRACT)}
        />
        {/* table data */}
        <div className="test">
          <DocumentTable<Contract>
            title={"Contracts"}
            columns={contractColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: Contract) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<Contract> handleClose={handleClose} open={open} selectedDocument={selectedDocument} />
      )}
    </>
  );
};

export default Contracts;
