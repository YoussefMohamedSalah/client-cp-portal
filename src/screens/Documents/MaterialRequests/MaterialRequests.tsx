import Loading from "components/UI/Loading";
import Table from "components/Common/Table";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { calculateWorkFlowStatus } from "utils/CalculateWorkFlowStatus";
import { ENUMS } from "enums/enums";
import { useState } from "react";
import WorkFlowStatusModal from "components/Modals/WorkFlowStatusModal";
import DocumentsTableActionBtn from "components/Common/DocumentsTableActionBtn";
import MaterialRequest from "types/Material_request";
import { useGetAllMaterialRequestsQuery } from "api/Documents/MaterialRequests/getAllMaterialRequests";

const MaterialRequests: React.FC = () => {
    const [selectedDocument, setSelectedDocument] = useState<MaterialRequest>({} as MaterialRequest);
    const [open, setOpen] = useState<boolean>(false);

    const { data, error, isLoading } = useGetAllMaterialRequestsQuery();
    const { push } = useApp();

    if (isLoading) return <Loading />;
    if (error) return null;

    let requests: MaterialRequest[] = [];
    if (data && data.materialRequests && data.materialRequests.data) {
        requests = data.materialRequests.data;
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (request: MaterialRequest) => {
        setSelectedDocument(request)
        setOpen(true);
    };

    let columnT: any[] = [
        {
            name: "Code",
            width: "110px",
            selector: (row: any) => row.code,
            sortable: true,
            cell: (row: any) => <span onClick={() => push(`/${PAGES.MATERIAL_REQUEST}/${row.id}`)} className="fw-bold text-secondary pointer">{row.code}</span>
        },
        {
            name: "Rev",
            width: "80px",
            selector: (row: any) => row.rev_num!,
            sortable: true,
            cell: (row: any) =>
                <span className="fw-bold">{row.rev_num!}</span>
        },
        {
            name: "Maker",
            width: "230px",
            selector: (row: any) => row.user?.name!,
            sortable: true,
            cell: (row: any) =>
                <span className="fw-bold">{row.user?.name!}</span>
        },
        {
            name: "Date",
            width: "100px",
            selector: (row: any) => row.date,
            sortable: true
        },
        {
            name: "Project",
            width: "120px",
            selector: (row: any) => row.project_details?.name!,
            sortable: true
        },
        {
            name: "Subject",
            width: "210px",
            selector: (row: any) => <span className="">{row.subject}</span>,
            sortable: false
        },
        {
            name: "Description",
            width: "390px",
            selector: (row: any) => <span className="">{row.description}</span>,
            sortable: false
        },
        {
            name: "Status",
            width: "100px",
            selector: (row: any) => row.status,
            sortable: true,
            cell: (row: any) => {
                let gradient = calculateWorkFlowStatus(row.work_flow);
                return (
                    <span className='pointer' onClick={() => handleOpen(row)}>
                        {row.status === ENUMS.STATUS.ARCHIVED ? (
                            <span className="badge bg-black text-white">Archived</span>
                        ) : (
                            <span className="badge text-black" style={{ background: gradient }}>{row.status}</span>
                        )}
                    </span>
                )
            }
        },
        {
            name: "ACTION",
            width: "120px",
            selector: (row: any) => { },
            sortable: false,
            cell: (row: any) =>
                <DocumentsTableActionBtn<MaterialRequest> data={row} />
        }
    ];

    return (
        <>
            <div className="container-fluid">
                {/* page header */}
                <PageHeader
                    headerTitle={'Purchase Order Requests'}
                    isBtnShow={true}
                    btnText={"Create PC"}
                    onClickBtn={() => push("/" + PAGES.PO_REQUEST)}
                />
                {/* table data */}
                <div className="row g-3 py-1 pb-4">
                    <Table<MaterialRequest>
                        title={'Purchase Order Requests'}
                        columns={columnT}
                        data={requests}
                        renderCards={true}
                        renderSearch={true}
                        renderDownload={true}
                        selectItem={(item: MaterialRequest) => setSelectedDocument(item)}
                    />
                </div>
            </div>
            {selectedDocument && selectedDocument.status !== ENUMS.STATUS.ARCHIVED && <WorkFlowStatusModal<MaterialRequest> handleClose={handleClose} open={open} selectedDocument={selectedDocument} />}
        </>
    );
};

export default MaterialRequests;
