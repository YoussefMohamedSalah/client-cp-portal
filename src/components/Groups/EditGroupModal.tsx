import FormInputs from "components/UI/FormInputs/FormInputs";
import { useUI } from "contexts/UIContext";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { checkIfExist } from "utils/Helpers";
import {
  GroupNumKeys,
  GroupRequiredKeys,
  GroupStrKeys,
} from "entitiesData/Group";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { SelectedGroup } from "types/Group";
import { groupInputUpdate, useUpdateGroup } from "api/Group/updateGroup";
import { SelectedEmployee } from "types/Employee";

interface Props {
  employees: SelectedEmployee[];
  group: any;
  children: string | JSX.Element | JSX.Element[];
  className?: string;
}

enum ModelKeys {
  NAME = "name",
  DESCRIPTION = "description",
  MEMBERS = "members",
  PERMISSIONS = "permissions",
}

const EditGroupModal: React.FC<Props> = ({
  group,
  className,
  children,
  employees,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [modelData, setModelData] = useState<SelectedGroup>(
    {} as SelectedGroup
  );
  const { showError, showSuccess } = useUI();

  const members = employees.map((employee) => {
    return {
      label: employee?.name,
      value: employee.id,
    };
  });

  //------------------ Modal Actions -------------------------------------
  const { mutateAsync: updateMutation } = useUpdateGroup();

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const updateGroup = async () => {
    let numbersToValidate = GroupNumKeys;
    let stringsToValidate = GroupStrKeys;
    let requiredToValidate = GroupRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = groupInputUpdate(modelData);
      await updateMutation(createInput);
      showSuccess();
      setShow(false);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  //------------------ Modal Fields -------------------------------------

  const formFields: IField[] = [
    {
      label: "Name",
      type: "text",
      key: ModelKeys.NAME,
      value: modelData?.name,
      onChange: (value: string | any) => handleModelData(ModelKeys.NAME, value),
      placeholder: "Enter Group Name",
      required: true,
    },
    {
      label: "Members",
      type: "multiSelect",
      key: ModelKeys.MEMBERS,
      value: modelData?.members || [],
      options: members,
      onChange: (value: string | any) => {
        let selectedUsers: any[] = modelData?.members || [];
        if (checkIfExist(selectedUsers, value)) {
          selectedUsers = selectedUsers.filter((user) => user !== value);
          handleModelData(ModelKeys.MEMBERS, selectedUsers);
        } else {
          selectedUsers.push(value);
          handleModelData(ModelKeys.MEMBERS, selectedUsers);
        }
      },
      placeholder: "Select Member",
      disabled: false,
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: ModelKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string | any) =>
        handleModelData(ModelKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      required: true,
    },
  ];

  // ------------

  useEffect(() => {
    setModelData(group);
  }, []);

  return (
    <>
      <button className={className} type="button" onClick={() => setShow(true)}>
        {children}
      </button>

      <Modal centered show={show} size="lg" onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Edit Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <FormInputs formFields={formFields} grid={true} />
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={updateGroup}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditGroupModal;
