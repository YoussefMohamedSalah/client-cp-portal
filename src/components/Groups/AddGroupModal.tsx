import FormInputs from "components/UI/FormInputs/FormInputs";
import { useUI } from "contexts/UIContext";
import { useState } from "react";
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
import { groupInput, useCreateGroup } from "api/Group/createGroup";
import { CreateGroup, SelectedGroup } from "types/Group";
import { SelectedEmployee } from "types/Employee";

interface Props {
  employees: SelectedEmployee[];
  onClose: () => void;
  show: boolean;
}

enum ModelKeys {
  NAME = "name",
  DESCRIPTION = "description",
  MEMBERS = "members",
  PERMISSIONS = "permissions",
}

const AddGroupModal: React.FC<Props> = ({ employees, onClose, show }) => {
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

  const { mutateAsync: createMutation } = useCreateGroup();

  const findSelectedMembers = (members: SelectedEmployee[], ids: any[]) => {
    const result = [];

    for (const member of members) {
      if (ids.includes(member.id)) {
        result.push(member);
      }
    }

    return result;
  };

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const createGroup = async () => {
    const selectedMembers = findSelectedMembers(employees, modelData.members!);

    const createData: CreateGroup = {
      members: selectedMembers,
      name: modelData.name!,
      description: modelData.description,
      managers: [],
    };

    let numbersToValidate = GroupNumKeys;
    let stringsToValidate = GroupStrKeys;
    let requiredToValidate = GroupRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: createData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = groupInput(createData);
      await createMutation(createInput);
      showSuccess();
      onClose();
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

  return (
    <Modal centered show={show} size="lg" onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add Group</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-body">
          <FormInputs formFields={formFields} grid={true} />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={createGroup}>
          Create
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddGroupModal;
