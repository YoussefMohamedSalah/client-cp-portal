import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Button from "components/UI/Button";
import { v4 as uuidv4 } from "uuid";
import Loading from "components/UI/Loading";
import { DailyReportProjectGroup } from "types/Daily_report";
import { Project } from "types/Project";
import TextInput from "components/UI/FormInputs/TextInput";

interface Props {
  project: Project;
}

const DailyReportDragAnDropContainer: React.FC<Props> = ({ project }) => {
  const [groups, setGroups] = useState<DailyReportProjectGroup[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (!isInitialized && project) {
      if (project.daily_report_groups && project.daily_report_groups?.length > 0) {
        setGroups(project.daily_report_groups);
      }

      const allEmployeesGroup: DailyReportProjectGroup = {
        groupId: uuidv4(),
        groupName: "All Employees",
        employees: project?.users?.map((employee) => ({ id: employee.id, name: employee.name, mark: 0 })) || [],
      };

      setGroups([allEmployeesGroup, ...(project.daily_report_groups || [])]);
      setIsInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    const newGroups = [...groups];

    const sourceGroups = newGroups.find((col) => col.groupId === source.droppableId);
    const destinationGroup = newGroups.find((col) => col.groupId === destination.droppableId);
    if (sourceGroups && destinationGroup) {
      const [movedItem] = sourceGroups.employees.splice(source.index, 1);
      destinationGroup.employees.splice(destination.index, 0, movedItem);
    }
    setGroups(newGroups);
  };

  const handleAddGroup = () => {
    let groupName: string = `Group - ${groups.length} `;
    setGroups((prevGroups) => [...prevGroups, { groupId: uuidv4(), groupName: groupName, employees: [] }]);
  };

  const handleGroupNameChange = (groupId: string, newGroupName: string) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => (group.groupId === groupId ? { ...group, groupName: newGroupName } : group)),
    );
  };

  const handleEmployeeChangeMark = (employeeId: string, mark: number) => {
    if (mark > 10 || mark < 0) {
      setGroups((prevGroups) => {
        const updatedGroups = prevGroups.map((group) => ({
          ...group,
          employees: group.employees.map((employee) =>
            employee.id === employeeId ? { ...employee, mark: mark < 0 ? 0 : 10 } : employee,
          ),
        }));
        return updatedGroups;
      });
    } else {
      setGroups((prevGroups) => {
        const updatedGroups = prevGroups.map((group) => ({
          ...group,
          employees: group.employees.map((employee) => (employee.id === employeeId ? { ...employee, mark } : employee)),
        }));
        return updatedGroups;
      });
    }
  };

  if (!isInitialized) return <Loading />;
  return (
    <div className="pt-2">
      <div className="col-sm d-flex align-items-center justify-content-center">
        <Button className="lift" content="Add Group" onClick={handleAddGroup} />
      </div>
      <div className="row clearfix gap-2">
        <DragDropContext onDragEnd={onDragEnd}>
          {groups.map((column) => (
            <Droppable key={column.groupId} droppableId={column.groupId}>
              {(provided) => (
                <div
                  className="col-md-3" // Adjust the column width based on your needs
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  <div
                    className="card"
                    style={{
                      padding: 8,
                      margin: 8,
                      minHeight: 200,
                    }}>
                    {column.groupName === "All Employees" ? (
                      <h5>All Employees</h5>
                    ) : (
                      <TextInput
                        type="text"
                        label="Group name"
                        value={column.groupName}
                        onChange={(value: string) => handleGroupNameChange(column.groupId, value)}
                      />
                    )}
                    <hr className="mt-0 mb-3" />
                    {column.employees.map((employee, index) => (
                      <Draggable key={employee.id} draggableId={employee.id} index={index}>
                        {(provided) => (
                          <div
                            className="card"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                              userSelect: "none",
                              padding: `${column.groupName !== "All Employees" ? "8px 16px" : "16px 16px"}`,
                              margin: "0 0 8px 0",
                              minHeight: "50px",
                              ...provided.draggableProps.style,
                            }}>
                            {column.groupName !== "All Employees" ? (
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="w-100">{employee.name}</div>
                                <TextInput
                                  type="number"
                                  width={"7rem"}
                                  value={employee.mark}
                                  onChange={(value: number) => handleEmployeeChangeMark(employee.id, Number(value))}
                                />
                              </div>
                            ) : (
                              <>{employee.name}</>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default DailyReportDragAnDropContainer;
