import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import { TaskKeys, TaskNumKeys, TaskStrKeys, TaskRequiredKeys } from "models/Task";
import { useEffect, useState } from "react";
import { inputsValidationType } from "types/Error";
import { IField } from "types/Forms/formFields";
import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { taskInput, useCreateTask } from "api/Tasks/createTask";
import { taskUpdateInput, useUpdateTask } from "api/Tasks/updateTask";
import { useDeleteTask } from "api/Tasks/deleteTask";
import { useTaskDetailsQuery } from "api/Tasks/getTaskDetails";
import DeleteModal from "components/Modals/DeleteModal";
import { useEmployeesQuery } from "api/Employees/getAllEmployees";
import { getOptions } from "utils/GetOptions";
import { Employee } from "types/Employee";
import { Project } from "types/Project";
import { Task } from "types/Task";
import { useProjectsQuery } from "api/Projects/getAllProjects";
import { PRIORITY, PROGRESS, TASK_TYPE } from "enums/enums";

interface Props {
  id?: string;
}

const TaskFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  const [selectedProject, setSelectedProject] = useState<Project>({} as Project);
  // -----
  const [modelData, setModelData] = useState<Task>({} as Task);
  const [isModal, setIsModal] = useState<boolean>(false);
  // -----
  const { mutateAsync: createMutation } = useCreateTask();
  const { mutateAsync: updateMutation } = useUpdateTask();
  const { mutateAsync: deleteMutation } = useDeleteTask();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: TaskData, error: TaskError, isLoading: TaskIsLoading } = useTaskDetailsQuery({ id });

  const { data: projectsData, error: projectsError, isLoading: projectsIsLoading } = useProjectsQuery({});

  const { data: employeesData, error: employeesError, isLoading: employeesIsLoading } = useEmployeesQuery({});

  // !Check if this is CREATE OR EDIT Modal
  useEffect(() => {
    if (!initialized) {
      if (id) setIsEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // !Assuming this is CREATE Modal
  useEffect(() => {
    if (!isEdit) {
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  // useEffect(() => {
  //   if (!initialized && TaskData) {
  //     let task: Task = TaskData?.task?.data!;
  //     setModelData({ ...task });
  //     if (task.project) {
  //       setSelectedProject(task.project);
  //     }
  //     setInitialized(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [TaskData]);

  if ((id && TaskIsLoading) || (!id && projectsIsLoading) || (!id && employeesIsLoading)) return <Loading />;
  if ((id && TaskError) || (!id && projectsError) || (!id && employeesError)) return null;

  let projects: Project[] = projectsData?.projects?.data || ([] as Project[]);
  let employees: Employee[] = employeesData?.employees?.data || ([] as Employee[]);
  let projectsOptions = getOptions(projects, "Select Project");
  let employeesOptions = getOptions(employees, "Select Employee");

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleReset = () => {
    setModelData({
      ...modelData,
      name: "",
      description: "",
      files: [],
      start_at: "",
      end_at: "",
      assigned_to: "",
      task_priority: PRIORITY.LOW,
      task_type: TASK_TYPE.INDIVIDUAL_TASK,
      thumbnail: {} as File,
    });
  };
  

  const formFields: IField[] = [
    {
      label: "Select Project",
      type: "select",
      key: TaskKeys.PROJECT,
      value: modelData?.projectId,
      options: projectsOptions,
      onChange: (value: string | any) => handleModelData(TaskKeys.PROJECT, value),
      placeholder: "Select Project",
      disabled: selectedProject ? true : false,
      hide: isEdit ? true : false,
    },
    {
      label: "Task Name",
      type: "text",
      key: TaskKeys.NAME,
      value: modelData?.name,
      onChange: (value: string | any) => handleModelData(TaskKeys.NAME, value),
      placeholder: "Enter Task Name",
      required: true,
    },
    {
      label: "Description",
      type: "textarea",
      key: TaskKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string | any) => handleModelData(TaskKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
      required: true,
    },
    {
      label: "Task Priority",
      type: "select",
      key: TaskKeys.TASK_PRIORITY,
      value: modelData?.task_priority,
      options: [
        {
          label: "High",
          value: "High",
        },
        {
          label: "Medium",
          value: "Medium",
        },
        {
          label: "Low",
          value: "Low",
        },
        {
          label: "Critical",
          value: "Critical",
        },
      ],
      onChange: (value: string | any) => handleModelData(TaskKeys.TASK_PRIORITY, value),
      placeholder: "Select Task Priority",
      //   default: {
      //     label: SelectedTask?.task_priority,
      //     value: SelectedTask?.task_priority,
      //   },
    },
    {
      label: "Start Date",
      type: "date",
      key: TaskKeys.START_DATE,
      value: modelData?.start_at,
      onChange: (value: string | any) => handleModelData(TaskKeys.START_DATE, value),
      placeholder: "Enter Start Date",
    },
    {
      label: "End Date",
      type: "date",
      key: TaskKeys.END_DATE,
      value: modelData?.end_at,
      onChange: (value: string | any) => handleModelData(TaskKeys.END_DATE, value),
      placeholder: "Enter End Date",
    },
  ];

  // MAIN ACTIONS

  const handleCreate = async () => {
    let numbersToValidate = TaskNumKeys;
    let stringsToValidate = TaskStrKeys;
    let requiredToValidate = TaskRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = taskInput(modelData);
      await createMutation(createInput);
      push("/" + PAGES.TASKS);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEdit = async () => {
    let numbersToValidate = TaskNumKeys;
    let stringsToValidate = TaskStrKeys;
    let requiredToValidate: string[] = [];

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = taskUpdateInput(modelData);
      await updateMutation({
        id: modelData.id,
        data: createInput,
      });
      showSuccess();
      push("/" + PAGES.TASKS);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation(modelData.id!);
      showSuccess();
      push("/" + PAGES.TASKS);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  if (!initialized) return <></>;
  return (
    <div className="container-xxl">
      <PageHeader headerTitle={""} isBtnShow={false} btnText={""} isBackBtn={true} />
      <div className="row g-3 pb-3 pb-xl-0">
        <div>
          <FormInputs formFields={formFields} grid={true} block={true} />
        </div>
        <div className="col-sm d-flex align-items-center justify-content-center gap-2">
          {isEdit ? (
            <>
              <Button className="lift" content="Cancel" onClick={() => push("/" + PAGES.TASKS)} variant="secondary" />
            </>
          ) : (
            <>
              <Button className="lift" content="Reset" onClick={handleReset} variant="secondary" />
            </>
          )}
          {isEdit ? (
            <>
              <Button className="lift" content="Edit" onClick={handleEdit} />
            </>
          ) : (
            <>
              <Button className="lift" content="Create" onClick={handleCreate} />
            </>
          )}
          <Button className="lift" content="details" onClick={() => push("/" + PAGES.Task_INFO + "/" + modelData.id)} />
        </div>
      </div>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={handleDelete}
        message={`Are you sure you want to delete ${modelData.name}?`}
        modalHeader={`Delete ${modelData.name}`}
      />
    </div>
  );
};

export default TaskFormPage;
