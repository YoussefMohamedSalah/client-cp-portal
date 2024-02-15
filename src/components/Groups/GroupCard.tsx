import { Group } from "types/Group";
import AddRemoveGroupEmployeeModal from "./AddRemoveGroupEmployeeModal";
import { SelectedEmployee } from "types/Employee";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import EditGroupModal from "./EditGroupModal";

interface Props {
  group: Group;
  employees: SelectedEmployee[];
}

const GroupCard: React.FC<Props> = ({ group, employees }) => {
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  if (isRemoved) return null;

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

                <AddRemoveGroupEmployeeModal
                  className="d-flex align-items-center"
                  employees={employees}
                  groupId={group.id}
                >
                  <i className="icofont-group-students"></i>

                  <span className="badge bg-light text-dark ms-2">
                    {group?.members?.length} Members
                  </span>

                  <span className="avatar rounded-circle text-center pointer sm">
                    <i className="icofont-ui-add"></i>
                  </span>
                </AddRemoveGroupEmployeeModal>
              </div>
            </div>

            <div
              className="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <EditGroupModal
                className="btn btn-outline-secondary"
                employees={employees}
                group={group}
              >
                <i className="icofont-edit text-success"></i>
              </EditGroupModal>

              <DeleteModal
                className="btn btn-outline-secondary"
                groupId={group.id}
                isRemoved={() => setIsRemoved(true)}
              >
                <i className="icofont-ui-delete text-danger"></i>
              </DeleteModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
