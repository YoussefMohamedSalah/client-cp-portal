import { useEffect, useState } from "react";
import { WorkFlow } from "types/Workflow";
import { Employee } from "types/Employee";
import ConditionsCard from "components/Common/ConditionsCard";
import AddMemberToWorkFlow from "./AddMemberToWorkFlow";

interface Props {
  tabName: string;
  tabKey: string;
  workflow: WorkFlow[];
  defaultConditions: string[] | null;
  onSave: (updatedData: WorkFlow[], term: string) => void;
}

const DocumentTab: React.FC<Props> = ({ tabName, tabKey, workflow, defaultConditions, onSave }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [membersArray, setMembersArray] = useState<WorkFlow[]>([]);
  const [conditions, setConditions] = useState<string[]>(defaultConditions ? [...defaultConditions] : []);

  const handleAddCondition = () => {
    setConditions((prevConditions) => [...prevConditions, ""]);
  };

  const handleRemoveCondition = (index: number) => {
    setConditions((prevConditions) => {
      const updatedConditions = [...prevConditions];
      updatedConditions.splice(index, 1);
      return updatedConditions;
    });
  };

  const handleConditionChange = (index: number, value: string) => {
    setConditions((prevConditions) => {
      const updatedConditions = [...prevConditions];
      updatedConditions[index] = value;
      return updatedConditions;
    });
  };

  useEffect(() => {
    setMembersArray(workflow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUp = (item: WorkFlow, index: number) => {
    if (index > 0) {
      const newArray = [...membersArray];
      const temp = newArray[index - 1];
      newArray[index - 1] = item;
      newArray[index] = temp;
      setMembersArray(newArray);
    }
  };

  const handleDown = (item: WorkFlow, index: number) => {
    if (index < membersArray.length - 1) {
      const newArray = [...membersArray];
      const temp = newArray[index + 1];
      newArray[index + 1] = item;
      newArray[index] = temp;
      setMembersArray(newArray);
    }
  };

  const handleRemove = (index: number) => {
    const newArray = [...membersArray];
    newArray.splice(index, 1);
    setMembersArray(newArray);
  };

  const assignMember = async (employee: Employee) => {
    // Check if the employee is already a member
    const isAlreadyMember = membersArray.some((member) => member.userId === employee.id);

    if (isAlreadyMember) {
      // If already a member, remove them from the array
      const updatedMembersArray = membersArray.filter((member) => member.userId !== employee.id);
      setMembersArray(updatedMembersArray);
    } else {
      // If not a member, add them to the array
      const employeeToAdd = {
        name: employee.name,
        title: "Manager",
        userId: employee.id,
        index: membersArray.length + 1,
        state: false,
        sign: employee.sign ? employee.sign : "",
        isRejected: false,
      };
      setMembersArray([...membersArray, employeeToAdd]);
    }
  };

  return (
    <>
      <div className="pt-2 d-flex flex-column gap-2">
        {defaultConditions ? (
          <ConditionsCard
            conditions={conditions}
            onAddCondition={handleAddCondition}
            onEdit={handleConditionChange}
            onRemove={handleRemoveCondition}
          />
        ) : null}
        <div className="card">
          <div className="card-header py-2 d-flex justify-content-center">
            <button type="button" className="btn btn-success text-white" onClick={() => setIsModal(true)}>
              <i className="fa fa-plus pe-2" />
              Add Member
            </button>
          </div>
          <div className="card-body">
            {membersArray.map((item: WorkFlow, index: number) => {
              return (
                <div key={index} className="timeline-item ti-danger border-bottom ms-2">
                  <div className="d-flex justify-content-between w-100">
                    <div className="d-flex">
                      <span className="avatar d-flex justify-content-center align-items-center rounded-circle light-success-bg">
                        {index + 1}
                      </span>
                      <div className="flex-fill ms-3">
                        <div className="mb-1">
                          <strong>{item?.name!}</strong>
                        </div>
                        <span className="d-flex text-muted align-items-center">
                          <i className="icofont-ui-clock me-1" /> {item?.title!}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex g-2">
                      <button
                        onClick={() => handleUp(item, index)}
                        type="button"
                        className="btn btn-sm light-success-bg text-end h-75 m-1"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        <i className="icofont-bubble-up" />
                      </button>
                      <button
                        onClick={() => handleRemove(index)}
                        type="button"
                        className="btn btn-sm light-danger-bg text-end h-75 m-1"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        <i className="icofont-close" />
                      </button>
                      <button
                        onClick={() => handleDown(item, index)}
                        type="button"
                        className="btn btn-sm light-warning-bg text-end h-75 m-1"
                        data-bs-toggle="modal"
                        data-bs-target="#dremovetask"
                      >
                        <i className="icofont-bubble-down" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="align-self-center mt-3">
          <button
            type="button"
            className="btn btn-sm btn-primary text-end h-75 m-1 "
            data-bs-toggle="modal"
            data-bs-target="#dremovetask"
            onClick={() => onSave(membersArray, tabName)}
          >
            Save
          </button>
        </div>
      </div>
      <AddMemberToWorkFlow
        show={isModal}
        onClose={() => setIsModal(false)}
        onSelect={assignMember}
        selectedEmployees={membersArray}
      />
    </>
  );
};

export default DocumentTab;
