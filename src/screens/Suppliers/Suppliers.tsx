import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { Supplier } from "types/Supplier";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import NormalTable from "components/Common/NormalTable";
import TableActionBtn from "components/Common/TableActionBtn";
import { useDeleteSupplier } from "api/Supplier/deleteSupplier";
import { useSuppliersQuery } from "api/Supplier/getAllSuppliers";

const Suppliers: React.FC = () => {
  const { mutateAsync: deleteMutation } = useDeleteSupplier();
  const { data, error, isLoading } = useSuppliersQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let suppliers: Supplier[] = data?.suppliers?.data! || ([] as Supplier[]);

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
        <span onClick={() => push(`/${PAGES.SUPPLIER_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
          {row.code}
        </span>
      ),
    },
    {
      name: "NAME",
      selector: (row: any) => {},
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
      selector: (row: any) => {},
      sortable: false,
      cell: (row: any) => (
        <TableActionBtn
          id={row.id!}
          title={row.name}
          onDelete={handleDelete}
          onClickEdit={() => push("/" + PAGES.SUPPLIER + "/" + row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Suppliers"}
          isBtnShow={true}
          btnText={"Create Supplier"}
          onClickBtn={() => push("/" + PAGES.SUPPLIER)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <NormalTable<Supplier>
            title={"Suppliers"}
            columns={columnT}
            data={suppliers}
            renderSearch={true}
            renderDownload={true}
            filterOptions={["name", "code"]}
          />
        </div>
      </div>
    </>
  );
};

export default Suppliers;
