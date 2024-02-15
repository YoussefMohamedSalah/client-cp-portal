import { useState } from "react";
import { Group } from "types/Group";
import { useGroupQuery } from "api/Group/getAllGroups";
import { useEmployeesGroupsQuery } from "api/Employees/getAllWithGroups";
import { Employee } from "types/Employee";

import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import GroupCard from "components/Groups/GroupCard";
import { useDeleteGroup } from "api/Group/deleteGroup";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import GroupModal from "components/Groups/GroupModal";

const Groups = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { mutateAsync: deleteMutation } = useDeleteGroup();
  const { showError, showSuccess } = useUI();

  const {
    data: groupData,
    error: groupError,
    isLoading: groupIsLoading,
  } = useGroupQuery({});

  const {
    data: employeesData,
    error: employeeError,
    isLoading: employeeIsLoading,
  } = useEmployeesGroupsQuery({});

  let groups: Group[] = groupData?.groups?.data || [];
  let employees: Employee[] = employeesData?.employees?.data || [];

  if (groupIsLoading || employeeIsLoading) return <Loading />;
  if (groupError || employeeError) return null;

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation({ id });
      showSuccess();
      window.location.reload()
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  return (
    <div className="container-fluid">
      {/* page header */}
      <PageHeader
        headerTitle={"Groups"}
        isBtnShow={true}
        btnText={"Add Group"}
        onClickBtn={() => setIsModal(true)}
      />

      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {groups.map((group: Group, idx: number) => (
          <GroupCard
            key={idx}
            onDelete={handleDelete}
            group={group}
            employees={employees}
          />
        ))}
      </div>
      <GroupModal
        employees={employees}
        show={isModal}
        selectedGroup={null}
        onClose={() => setIsModal(false)}
      />
    </div>
  );
};

export default Groups;
