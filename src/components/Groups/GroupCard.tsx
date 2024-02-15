import { Group } from "types/Group";
import { Employee } from "types/Employee";
import DeleteModal from "components/Modals/DeleteModal";
import { useState } from "react";
import Button from "@mui/material/Button";
import { GroupsOutlinedIcon } from "components/Icons/MuiIcons";
import AddRemoveGroupEmployeeModal from "./AddRemoveGroupEmployeeModal";
import GroupModal from "./GroupModal";

type ModalType = "delete" | "edit" | "create" | "add_emp" | "";

interface Props {
  group: Group;
  employees: Employee[];
  onDelete: (id: string) => void;
}

const GroupCard: React.FC<Props> = ({ group, employees, onDelete }) => {
  const [modal, setModal] = useState<ModalType>("");
  const handleCloseModal = (reload = false) => {
    if (reload) window.location.reload();
    setModal("");
  };

  return (
    <div className="col">
      <div className="card border-0 shadow">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="row align-items-center">
              <div className="col-auto">
                <i className="icofont-users fs-4"></i>
              </div>
              <div className="col ps-0">
                <h5 className="card-title mb-1">{group?.name}</h5>
                <p className="card-text mb-2">{group?.description}</p>
                <Button
                  onClick={() => setModal("add_emp")}
                  size="small"
                  variant="contained"
                  className="bg-primary text-white"
                  startIcon={<GroupsOutlinedIcon />}
                >
                  Members: {group?.members?.length!}
                </Button>
              </div>
            </div>
            <div className="btn-group" role="group" aria-label="Basic outlined example">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setModal("edit")}>
                <i className="icofont-edit text-success" />
              </button>
              <button type="button" className="btn btn-outline-secondary deleterow" onClick={() => setModal("delete")}>
                <i className="icofont-close-circled text-danger"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <GroupModal employees={employees} show={modal === "edit"} selectedGroup={group} onClose={handleCloseModal} />
      <DeleteModal
        show={modal === "delete"}
        message={`Are you sure you want to delete ${group.name}?`}
        modalHeader={`Delete ${group.name}`}
        onDelete={() => onDelete(group.id)}
        onClose={handleCloseModal}
      />
      <AddRemoveGroupEmployeeModal
        show={modal === "add_emp"}
        employees={employees}
        groupId={group.id}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default GroupCard;
