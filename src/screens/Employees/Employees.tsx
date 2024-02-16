import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { Employee } from "types/Employee";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import NormalTable from "components/Common/NormalTable";
import TableActionBtn from "components/Common/TableActionBtn";
import { useDeleteEmployee } from "api/Employees/deleteEmployee";
import { useEmployeesQuery } from "api/Employees/getAllEmployees";
import { isSuperUserRole } from "utils/Session";
import { getImageUrl } from "utils/Helpers";

const Employees: React.FC = () => {
  const { mutateAsync: deleteMutation } = useDeleteEmployee();
  const { data, error, isLoading } = useEmployeesQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let employees: Employee[] = data?.employees.data! || ([] as Employee[]);

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
        <span onClick={() => push(`/${PAGES.EMPLOYEE_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
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
          <img
            className="avatar rounded-circle"
            src={
              row.avatar
                ? getImageUrl(row?.avatar!)
                : "https://gravatar.com/avatar/f42228ef47a296bebf07d1228e2eabd6?s=400&d=robohash&r=x"
            }
            alt={`${row.name}'s pic`}
          />
          <span className="fw-bold ms-1">{row.name}</span>
        </>
      ),
    },
    {
      name: "BUSINESS TITLE",
      selector: (row: any) =>
        row.business_title
          ? row.business_title
          : `${row.department_info?.name ? row.department_info.name + "-" : `${isSuperUserRole(row.role) ? "SuperUser" : row.role}`}`,
      sortable: true,
    },
    {
      name: "DEPARTMENT",
      selector: (row: any) => row.department_info?.name!,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row: any) => row.email,
      sortable: false,
    },
    {
      name: "ACTION",
      width: "120px",
      selector: (row: any) => { },
      sortable: false,
      cell: (row: any) => (
        <TableActionBtn
          id={row.id!}
          title={row.name}
          onDelete={handleDelete}
          onClickEdit={() => push("/" + PAGES.EMPLOYEE + "/" + row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Employees"}
          isBtnShow={true}
          btnText={"Create Employee"}
          onClickBtn={() => push("/" + PAGES.EMPLOYEE)}
        />
        {/* table data */}
        <div className="row g-3 py-1 pb-4">
          <NormalTable<Employee>
            title={"Employees"}
            columns={columnT}
            data={employees}
            renderSearch={true}
            renderDownload={true}
            filterOptions={["name", "code"]}
          />
        </div>
      </div>
    </>
  );
};

export default Employees;
