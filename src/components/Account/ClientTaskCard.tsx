import Loading from "components/UI/Loading";
import { useTasksQuery } from "api/Tasks/getAllTasks";
import { Task } from "types/Task";
import { getPriorityBadge, getShortString } from "utils/Helpers";

const ClientTaskCard: React.FC = () => {
  let { data, error, isLoading } = useTasksQuery({});
  if (isLoading) return <Loading />;
  if (error) return null;

  let tasksData: any = data?.tasks?.data || [];
  let companyTasks: Task[] = tasksData?.companyTasks!;
  let groupsTasks: Task[] = tasksData?.groupsTasks!;
  let individualTasks: Task[] = tasksData?.individualTasks!;
  let tasks: Task[] = [];
  if (companyTasks) tasks = [...tasks, ...companyTasks];
  if (groupsTasks) tasks = [...tasks, ...groupsTasks];
  if (individualTasks) tasks = [...tasks, ...individualTasks];

  return (
    <div className="card mb-3">
      <div className="card-header py-3">
        <h6 className="mb-0 fw-bold ">Tasks</h6>
      </div>
      <div className="card-body">
        <div className="planned_task client_task">
          {tasks && tasks.length > 0 ? (
            <div className="dd container horizontal-scrollable overflow-x-scroll " data-plugin="nestable">
              <div className="d-flex g-3 mb-3">
                <>
                  {tasks?.map((task, index) => {
                    return (
                      <>
                        <div
                          className="dd-handle w-auto me-2 d-flex flex-column justify-content-between"
                          style={{ minWidth: "19rem", minHeight: "12rem" }}>
                          <div>
                            <div className="task-info d-flex align-items-center justify-content-between">
                              <h6 className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-14 mb-0">
                                {task.name}
                              </h6>
                              <div className="task-priority d-flex flex-column align-items-center justify-content-center">
                                <span className={getPriorityBadge(task?.task_priority!) + " text-end mt-1"}>
                                  {task.task_priority}
                                </span>
                              </div>
                            </div>
                            <div style={{ maxHeight: "2rem", overflow: "" }}>
                              <p className="py-2 mb-0">{getShortString(`${task.description}`, 140)}</p>
                            </div>
                          </div>
                          <div className="ticket-info row g-3 align-items-center ">
                            {/* <div className="col-sm" /> */}
                            <div className="col-sm text-end">
                              <div className="small text-truncate light-danger-bg py-1 px-2 rounded-1 d-inline-block fw-bold small">
                                {task.task_type!}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              </div>
            </div>
          ) : (
            <>
              <div
                className="dd-handle me-2 d-flex flex-column justify-content-center align-items-center"
                style={{ minWidth: "19rem", minHeight: "12rem" }}>
                <div>No Tasks Yet</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientTaskCard;
