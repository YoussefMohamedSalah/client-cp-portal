import React, { useState } from "react";
import PageHeader from "components/Common/PageHeader";
import TableActionBtn from "components/Common/TableActionBtn";
import { Todo } from "types/Todo";
import { STATUS } from "enums/enums";
import { useTodosQuery } from "api/Todo/getAllTodos";
import Loading from "components/UI/Loading";
import { todoInput, useCreateTodo } from "api/Todo/createTodo";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { useDeleteTodo } from "api/Todo/deleteTodo";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Button from "components/UI/Button";
import { TodoKeys } from "models/Todo";
import StatusCards from "components/Common/StatusCards";

const Todos: React.FC = () => {
  const todos = [
    { id: "1", title: "Title1", desc: "Desc1", status: "Pending" },
    { id: "2", title: "Title2", desc: "Desc2", status: "On Progress" },
  ];

  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  const handleFilter = (filtered: Todo[]) => {
    setFilteredTodos(filtered);
  };

  //   const { data, error, isLoading } = useTodosQuery({});
  const [modelData, setModelData] = useState({ id: "", title: "", desc: "", status: "" });
  // -----
  const { mutateAsync: createMutation } = useCreateTodo();
  //    const { mutateAsync: updateMutation } = useUpdateTodo();
  const { mutateAsync: deleteMutation } = useDeleteTodo();

  const { showError, showSuccess } = useUI();

  // control the value of input
  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleCreate = async () => {
    // Check if title or desc is empty
    if (!modelData.title.trim() || !modelData.desc.trim()) {
      // Handle error (e.g., show an alert)
      alert("Please enter both title and description");
      return;
    }
    try {
      let createInput = todoInput(modelData);
      console.log(createInput);
      await createMutation(createInput);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation(modelData.id!);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const formFields = [
    {
      label: "Title",
      type: "text",
      width: "col-md-4",
      placeholder: "Enter Todo Title",
      value: modelData.title,
      name: "title",
      onChange: (value: string | any) => handleModelData(TodoKeys.TITLE, value),
      required: true,
    },
    {
      label: "Desc",
      type: "text",
      width: "col-md-4",
      placeholder: "Enter Todo Description",
      value: modelData.desc,
      name: "desc",
      onChange: (value: string | any) => handleModelData(TodoKeys.DESC, value),
      required: true,
    },
    {
      label: "Status",
      type: "select",
      width: "col-md-4",
      placeholder: "Select Status",
      value: modelData.status,
      name: "status",
      onChange: (value: string | any) => handleModelData(TodoKeys.STATUS, value),
      options: [
        { value: "Done", label: "Done" },
        { value: "ToDo", label: "Todo" },
        { value: "On Progress", label: "On Progress" },
        { value: "Pending", label: "Pending" },
      ],
      required: true,
    },
  ];

  //   if (isLoading) return <Loading />;
  //   if (error) return null;

  //   let todos: Todo[] = data?.todos?.data! || ([] as Todo[]);

  const todosList =
    filteredTodos.length > 0 ? (
      filteredTodos.map((ele) => (
        <div
          key={ele.id}
          className="card teacher-card d-flex flex-row align-items-center justify-content-between mb-3 p-3">
          <div className="content">
            <h3 className="font-weight-bold pb-2 fs-6 p-0 m-0 text-secondary">{ele.title}</h3>
            <p className="p-0 m-0">{ele.desc}</p>
          </div>
          <span className="pointer">
            {ele.status === STATUS.PENDING ? (
              <span className="badge bg-black text-white">Pending</span>
            ) : (
              <span className="badge text-black">{ele.status}</span>
            )}
          </span>
          <div className="icons">
            <TableActionBtn
              title={ele.title}
              id={ele.id}
              onDelete={handleDelete}
              onClickEdit={() => {
                console.log("edit");
              }}
            />
          </div>
        </div>
      ))
    ) : (
      <div className="alert alert-warning" role="alert">
        No data available.
      </div>
    );

  return (
    <div className="container-fluid">
      {/* page header */}
      <PageHeader headerTitle={"Todos"} />
      <div className="row g-3 pb-3 pb-xl-0">
        <div>
          <div className="card teacher-card mb-3 py-3 px-5">
            <div className="card-body px-0">
              <FormInputs formFields={formFields} grid={true} block={true} />
              <div className="col-sm d-flex align-items-center justify-content-center gap-2">
                <Button className="lift" content="Add" onClick={handleCreate} />
              </div>
            </div>
          </div>
        </div>
        <StatusCards data={todos} onFilter={handleFilter} />
        {todosList}
      </div>
    </div>
  );
};

export default Todos;
