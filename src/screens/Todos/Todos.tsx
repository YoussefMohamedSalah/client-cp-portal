import React, { useState } from "react";
import PageHeader from "components/Common/PageHeader";
import { IField } from "types/Forms/formFields";
import { Todo } from "types/Todo";
import { useTodosQuery } from "api/Todo/getAllTodos";
import Loading from "components/UI/Loading";
import { todoInput, useCreateTodo } from "api/Todo/createTodo";
import { useUI } from "contexts/UIContext";
import { handleError, handleServerError } from "utils/HandlingServerError";
import { useDeleteTodo } from "api/Todo/deleteTodo";
import Button from "components/UI/Button";
import { TodoKeys } from "models/Todo";
import TodosDragAnDropContainer from "components/Todos/TodosDragContainer";
import { useUpdateTodo } from "api/Todo/updateTodo";
import TodoModal from "components/Todos/TodoModal";
import { TODO } from "enums/enums";

const Todos: React.FC = () => {
  const [isModal, setIsModal] = useState<"none" | "edit" | "create">("none");
  const { data, error, isLoading } = useTodosQuery({});
  const [modelData, setModelData] = useState<Todo>({} as Todo);
  // -----
  const { mutateAsync: createMutation } = useCreateTodo();
  const { mutateAsync: updateMutation } = useUpdateTodo();
  const { mutateAsync: deleteMutation } = useDeleteTodo();

  const { showError, showSuccess } = useUI();

  // control the value of input
  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleOpenModal = (todo: Todo = {} as Todo) => {
    setModelData(todo);
    setIsModal(todo?.status! ? "edit" : "create");
  };

  const handleClose = () => {
    setIsModal("none");
  };

  const handleCreate = async () => {
    if (!modelData.title!) return showError(handleError("Please enter title"));
    if (!modelData.status!) modelData.status = TODO.TODO;

    try {
      let createInput = todoInput(modelData);
      await createMutation(createInput);
      handleClose();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation(id);
      showSuccess();
      handleClose();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleUpdate = async () => {
    try {
      await updateMutation(modelData);
      showSuccess();
      handleClose();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const formFields: IField[] = [
    {
      label: "Title",
      type: "text",
      width: "col-md-12",
      placeholder: "Enter Todo Title",
      value: modelData?.title!,
      onChange: (value: string | any) => handleModelData(TodoKeys.TITLE, value),
      required: true,
    },
    {
      label: "Desc",
      type: "textarea",
      width: "col-md-12",
      placeholder: "Enter Todo Description",
      value: modelData?.description!,
      onChange: (value: string | any) => handleModelData(TodoKeys.DESCRIPTION, value),
      required: true,
    },
    {
      label: "Status",
      type: "select",
      width: "col-md-12",
      placeholder: "Select Status",
      value: modelData?.status!,
      onChange: (value: string | any) => handleModelData(TodoKeys.STATUS, value),
      options: [
        { label: "ToDo", value: "Todo" },
        { label: "On Progress", value: "On progress" },
        { label: "Done", value: "Done" },
        { label: "Others", value: "Others" },
      ],
      required: true,
    },
  ];

  if (isLoading) return <Loading />;
  if (error) return null;
  let todos: Todo[] = data?.todos?.data! || ([] as Todo[]);

  return (
    <div className="container-fluid">
      {/* page header */}
      <PageHeader headerTitle={"Todos"} />
      <div className="row g-3 pb-3 pb-xl-0">
        <div>
          <div className="col-sm d-flex align-items-center justify-content-center gap-2">
            <Button className="lift" content="Create" onClick={() => handleOpenModal()} />
          </div>
        </div>
        <TodosDragAnDropContainer todos={todos} onDelete={handleDelete} onUpdate={handleOpenModal} />
      </div>
      <TodoModal
        isModal={isModal}
        formFields={formFields}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onClose={handleClose}
      />
    </div>
  );
};

export default Todos;
