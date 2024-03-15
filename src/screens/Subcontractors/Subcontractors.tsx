import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import NormalTable from "components/Common/NormalTable";
import TableActionBtn from "components/Common/TableActionBtn";
import { useDeleteSubcontractor } from "api/Subcontractors/deleteSubcontractor";
import { useSubcontractorsQuery } from "api/Subcontractors/getAllSubcontractors";
import { Subcontractor } from "types/Subcontractor";
import { isAdminView } from "utils/Helpers";

const Subcontractors: React.FC = () => {
  const { mutateAsync: deleteMutation } = useDeleteSubcontractor();
  const { data, error, isLoading } = useSubcontractorsQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let subcontractors: Subcontractor[] = data?.subcontractors?.data! || ([] as Subcontractor[]);

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation(id);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  let columnT: any[] = [
    {
      name: "ID",
      width: "110px",
      selector: (row: any) => row.code,
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.SUBCONTRACTOR_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
          {row.code}
        </span>
      ),
    },
    {
      name: "NAME",
      selector: (row: any) => { },
      sortable: true,
      cell: (row: any) => (
        <>
          <span className="fw-bold ms-1">{row.name}</span>
        </>
      ),
    },
    {
      name: "COMPANY",
      selector: (row: any) => row.company_name!,
      sortable: true,
    },
    {
      name: "PHONE NUMBER",
      selector: (row: any) => row.phone_number!,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row: any) => row.email,
      sortable: false,
    },
    {
      name: "COUNTRY",
      selector: (row: any) => row.country!,
      sortable: true,
    },
    {
      name: "ACTION",
      width: "120px",
      selector: (row: any) => { },
      sortable: false,
      cell: (row: any) => (
        <TableActionBtn
          id={row.id!}
          title={row.name || row.company_name}
          onDelete={handleDelete}
          onClickEdit={() => push("/" + PAGES.SUBCONTRACTOR + "/" + row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Subcontractors"}
          isBtnShow={isAdminView() ? true : false}
          btnText={"Create Subcontractor"}
          onClickBtn={() => push("/" + PAGES.SUBCONTRACTOR)}
        />
        {/* table data */}
        <div className="test">
          <NormalTable<Subcontractor>
            title={"Subcontractors"}
            columns={columnT}
            data={subcontractors}
            renderSearch={true}
            renderDownload={true}
            filterOptions={["name", "code"]}
          />
        </div>
      </div>
    </>
  );
};

export default Subcontractors;
