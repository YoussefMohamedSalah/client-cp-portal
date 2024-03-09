import FormInputs from "components/UI/FormInputs/FormInputs";
import { useUI } from "contexts/UIContext";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { GroupKeys, GroupNumKeys, GroupRequiredKeys, GroupStrKeys } from "models/Group";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { groupInput, useCreateGroup } from "api/Group/createGroup";
import { CreateGroup, Group } from "types/Group";
import { Employee } from "types/Employee";
import { getOptions } from "utils/GetOptions";
import { groupInputUpdate, useUpdateGroup } from "api/Group/updateGroup";

interface Props {
  show: boolean;
  employees: Employee[];
  selectedGroup: Group | null;
  onClose: () => void;
}

const GroupModal: React.FC<Props> = ({ show, employees, selectedGroup, onClose }) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [modelData, setModelData] = useState<Group>(selectedGroup ? { ...selectedGroup } : ({} as Group));
  const [selectedMembersIds, setSelectedMembersIds] = useState<string[]>([]);

  const { mutateAsync: createMutation } = useCreateGroup();
  const { mutateAsync: updateMutation } = useUpdateGroup();
  const { showError, showSuccess } = useUI();

  let membersOptions = getOptions(employees, null);

  useEffect(() => {
    if (!initialized) {
      if (selectedGroup) handleFormatMembersIds();
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, initialized]);

  const handleFormatMembersIds = () => {
    let members: Employee[] = modelData.members! || ([] as Employee[]);
    let membersIds: string[] = [];
    for (let i = 0; i < members.length; i++) {
      const id: string = members[i].id;
      membersIds.push(id);
    }
    setSelectedMembersIds(membersIds);
  };

  const handleModelData = (key: string, value: any) => {
    if (key === GroupKeys.MEMBERS) return handleAddOnlyMembersIds(value);

    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleAddOnlyMembersIds = (id: string) => {
    if (selectedMembersIds.indexOf(id)) {
      let updatedMembers = selectedMembersIds.filter((member) => member !== id);
      setSelectedMembersIds([...updatedMembers]);
    } else setSelectedMembersIds([...selectedMembersIds, id]);
  };

  const formFields: IField[] = [
    {
      label: "Name",
      type: "text",
      key: GroupKeys.NAME,
      value: modelData?.name,
      onChange: (value: string | any) => handleModelData(GroupKeys.NAME, value),
      placeholder: "Enter Group Name",
      required: true,
    },
    {
      label: "Members",
      type: "multiSelect",
      key: GroupKeys.MEMBERS,
      value: modelData?.members || [],
      options: membersOptions,
      onChange: (value: string) => {
        handleModelData(GroupKeys.MEMBERS, value);
      },
      placeholder: "Select Member",
      disabled: false,
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: GroupKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string | any) => handleModelData(GroupKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      required: true,
    },
  ];

  const handleCreate = async () => {
    const createData: CreateGroup = {
      members: selectedMembersIds,
      name: modelData.name!,
      description: modelData.description!,
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

  const handleUpdate = async () => {
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
      window.location.reload();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  return (
    <Modal centered show={show} size="lg" onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Add Group</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormInputs formFields={formFields} grid={true} />
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Cancel
        </button>
        {selectedGroup ? (
          <button type="button" className="btn btn-primary" onClick={handleUpdate}>
            Edit
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={handleCreate}>
            Create
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default GroupModal;
