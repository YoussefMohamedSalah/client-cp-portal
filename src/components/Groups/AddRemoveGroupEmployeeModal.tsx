import { Modal } from "react-bootstrap";
import React, { useState } from "react";

import { SelectedEmployee } from "types/Employee";
import { getImageUrl } from "utils/Helpers";
import {
  removeMemberFromGroupInput,
  useRemoveMemberFromGroup,
} from "api/Group/RemoveFromGroup";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import {
  addMemberToGroupInput,
  useAddMemberToGroup,
} from "api/Group/addToGroup";

interface Props {
  groupId?: string;
  className: string;
  employees: SelectedEmployee[];
  children: string | JSX.Element | JSX.Element[];
}

const AddRemoveGroupEmployeeModal: React.FC<Props> = ({
  className,
  children,
  employees,
  groupId,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SelectedEmployee[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  const { showError, showSuccess } = useUI();

  const { mutateAsync: removeMemberMutation } = useRemoveMemberFromGroup();
  const { mutateAsync: addMemberMutation } = useAddMemberToGroup();

  //------------------ Modal Functions -------------------------------------

  const assignMember = async (employee: SelectedEmployee) => {
    try {
      let createInput = addMemberToGroupInput({
        groupId: groupId || "",
        user: employee,
      });

      await addMemberMutation(createInput);
      showSuccess();
      setShow(false);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const removeMember = async (employee: SelectedEmployee) => {
    try {
      let createInput = removeMemberFromGroupInput({
        groupId: groupId || "",
        memberId: employee.id,
      });

      await removeMemberMutation(createInput);
      showSuccess();
      setShow(false);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setSearchResult([]);

    if (e.target.value.length > 0) {
      const result = employees.filter((employee) => {
        const fullName = employee?.name;
        return fullName.toLowerCase().includes(e.target.value.toLowerCase());
      });

      result.length === 0 ? setNotFound(true) : setNotFound(false);
      setSearchResult(result);
    }
  };

  const handleSelect = (employee: SelectedEmployee) => {
    let existingMemberArray = employee?.groups?.map((group) => {
      return group?.id! === groupId;
    });

    let isExists = existingMemberArray
      ? existingMemberArray?.includes(true)
      : false;

    if (isExists) {
      console.log("existing employee");
      removeMember(employee);
      // employee?.groups?.push({id: groupId}) Now filter
    }

    assignMember(employee);
  };

  return (
    <>
      <button className={className} type="button" onClick={() => setShow(true)}>
        {children}
      </button>

      <Modal centered size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Assign Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inviteby_email scroll_div">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search Employee"
                onChange={handleSearch}
                // id='searchField'
                // ref={inputRef}
              />
            </div>
            {/* view search result view for employee and group */}
            {searchResult && searchResult.length > 0 && (
              <div className="members_list mb-3 ">
                <h6 className="fw-bold ">Search Result </h6>
                <ul
                  className="list-unstyled list-group list-group-custom list-group-flush mb-0"
                  style={{
                    marginTop: "20px",
                    maxHeight: "500px",
                    overflowY: "scroll",
                  }}
                >
                  {searchResult.map((employee, index) => {
                    return (
                      <li
                        className="list-group-item py-3 text-center text-md-start dd-handle m-1 pointer"
                        key={index}
                        onClick={() => handleSelect(employee)}
                      >
                        <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
                          <div className="no-thumbnail mb-2 mb-md-0">
                            <img
                              className="avatar lg rounded-circle"
                              src={getImageUrl(employee?.avatar!)}
                              alt=""
                            />
                          </div>

                          <div className="flex-fill ms-3 text-truncate">
                            <h6 className="mb-0  fw-bold">
                              {employee?.name} - {employee.business_title}
                            </h6>
                            <span className="text-muted">
                              {employee?.groups?.length!
                                ? `Member In ${employee?.groups
                                    ?.length!} Group${
                                    employee?.groups?.length! > 1 ? "s" : ""
                                  }`
                                : ""}{" "}
                            </span>
                            <span className="text-muted">
                              {employee?.department_info?.name &&
                                ` - ${employee?.department_info?.name}`}{" "}
                            </span>
                          </div>

                          <div>
                            {employee.groups?.map((group: any) => {
                              let isMember = group?.id! === groupId;
                              return (
                                <div>
                                  {isMember ? (
                                    <>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="26"
                                        height="26"
                                        fill="green"
                                        className="bi bi-check"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                                      </svg>
                                    </>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {notFound && (
              <div className="text-center">
                <h6 className="fw-bold ">No data found</h6>
              </div>
            )}

            <div className="divider mb-3 border-top"></div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddRemoveGroupEmployeeModal;
