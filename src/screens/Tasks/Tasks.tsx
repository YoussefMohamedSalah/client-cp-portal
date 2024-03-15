import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { Task } from "types/Task";
import { useDeleteTask } from "api/Tasks/deleteTask";
import TaskCard from "components/Tasks/TaskCard";
import { useTasksQuery } from "api/Tasks/getAllTasks";
import { isAdminView } from "utils/Helpers";

const Tasks: React.FC = () => {
  const { mutateAsync: deleteMutation } = useDeleteTask();
  const { data, error, isLoading } = useTasksQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let tasks: Task[] = data?.tasks?.data! || ([] as Task[]);

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation(id);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Tasks"}
          isBtnShow={isAdminView() ? true : false}
          btnText={"Create Tasks"}
          onClickBtn={() => push("/" + PAGES.TASK)}
        />
        {/* table data */}
        <div className="test">
          {tasks.map((task: Task) => (
            <div key={task.id}>
              <TaskCard task={task} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tasks;
