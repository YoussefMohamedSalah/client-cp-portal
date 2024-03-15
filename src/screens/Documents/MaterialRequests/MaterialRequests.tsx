import Loading from "components/UI/Loading";
import DocumentTable from "components/Common/DocumentTable";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { STATUS } from "enums/enums";
import { useEffect, useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import { MaterialRequest } from "types/Material_request";
import { useGetAllMaterialRequestsQuery } from "api/Documents/MaterialRequests/getAllMaterialRequests";
import { isAdminView } from "utils/Helpers";
import useColumnTable from "hooks/useColumnTable";

const MaterialRequests: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<MaterialRequest>({} as MaterialRequest);
  const [open, setOpen] = useState<boolean>(false);
  const [requests, setRequests] = useState<MaterialRequest[]>([] as MaterialRequest[]);
  const { data, error, isLoading } = useGetAllMaterialRequestsQuery();
  const { push } = useApp();

  const handleOpen = (request: MaterialRequest) => {
    setSelectedDocument(request);
    setOpen(true);
  };

  const { materialColumnT } = useColumnTable(handleOpen);

  useEffect(() => {
    if (data && data.materialRequests && data.materialRequests.data) {
      setRequests(data.materialRequests.data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return null;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Material Requests"}
          isBtnShow={!isAdminView() ? true : false}
          btnText={"Create Material Request"}
          onClickBtn={() => push("/" + PAGES.MATERIAL_REQUEST)}
        />
        {/* table data */}
        <div className="test">
          <DocumentTable<MaterialRequest>
            title={"Material Requests"}
            columns={materialColumnT}
            data={requests}
            renderCards={true}
            renderSearch={true}
            renderDownload={true}
            selectItem={(item: MaterialRequest) => setSelectedDocument(item)}
            filterOptions={["name", "date", "code"]}
          />
        </div>
      </div>
      {selectedDocument && selectedDocument.status !== STATUS.ARCHIVED && (
        <WorkFlowStatusModal<MaterialRequest>
          handleClose={handleClose}
          open={open}
          selectedDocument={selectedDocument}
        />
      )}
    </>
  );
};

export default MaterialRequests;
