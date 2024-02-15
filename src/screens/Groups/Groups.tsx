import { useState } from "react";

import { Group } from "types/Group";
import { useGroupQuery } from "api/Group/getAllGroups";
import { useEmployeesGroupsQuery } from "api/employee/getAllWithGroups";
import { SelectedEmployee } from "types/Employee";

import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import GroupCard from "components/Groups/GroupCard";
import AddGroupModal from "components/Groups/AddGroupModal";

const Groups = () => {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

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
  let employees: SelectedEmployee[] = employeesData?.employees?.data || [];

  if (groupIsLoading || employeeIsLoading) return <Loading />;
  if (groupError || employeeError) return null;

  return (
    <div className="container-fluid">
      {/* page header */}
      <PageHeader
        headerTitle={"Groups"}
        isBtnShow={true}
        btnText={"Add Group"}
        onClickBtn={() => setOpenAddModal(true)}
      />

      {/* table data */}
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {groups.map((group: Group, idx: number) => (
          <GroupCard group={group} employees={employees} key={idx} />
        ))}
      </div>

      <AddGroupModal employees={employees} onClose={() => setOpenAddModal(false)} show={openAddModal} />
    </div>
  );
};

export default Groups;
