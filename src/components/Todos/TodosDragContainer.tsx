import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TODO } from "enums/enums";
import { Todo } from "types/Todo";
import IconButton from "@mui/material/IconButton";
import {
	DeleteIcon,
	EditOutlinedIcon,
} from "components/Icons/MuiIcons";
import { useUpdateTodo } from "api/Todo/updateTodo";
import { handleServerError } from "utils/HandlingServerError";
import { useUI } from "contexts/UIContext";

interface Props {
	todos: Todo[];
	onDelete: (id: string) => void;
	onUpdate: (todo: Todo) => void;
}

interface TaskType {
	id: string;
	name: string;
	todos: Todo[];
};

const TodosDragAnDropContainer = ({ todos, onDelete, onUpdate }: Props) => {
	const { mutateAsync: updateMutation } = useUpdateTodo();
	const { showError } = useUI();

	const [groups, setGroups] = useState<TaskType[]>([
		{ id: "todo", name: "Todo", todos: [] },
		{ id: "on_progress", name: "On progress", todos: [] },
		{ id: "done", name: "Done", todos: [] },
		{ id: "others", name: "Others", todos: [] },
	]);

	useEffect(() => {
		if (todos) {
			let todoArr = todos?.filter((todo) => todo.status === TODO.TODO) || [];
			let onProgressArr = todos?.filter((todo) => todo.status === TODO.ON_PROGRESS) || [];
			let doneArr = todos?.filter((todo) => todo.status === TODO.DONE) || [];
			let othersArr = todos?.filter((todo) => todo.status === TODO.OTHERS) || [];

			let newGroups = [
				{ id: "todo", name: "Todo", todos: [...todoArr] },
				{ id: "on_progress", name: "On progress", todos: [...onProgressArr] },
				{ id: "done", name: "Done", todos: [...doneArr] },
				{ id: "others", name: "Others", todos: [...othersArr] },
			];

			setGroups(newGroups)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todos]);

	const onDragEnd = (result: any) => {
		if (!result.destination) return;
		const { source, destination } = result;
		if (source.droppableId === destination.droppableId && source.index === destination.index) {
			return;
		}
		const newGroups = [...groups];

		const sourceGroups = newGroups.find((col) => col.id === source.droppableId);
		const destinationGroup = newGroups.find((col) => col.id === destination.droppableId);
		if (sourceGroups && destinationGroup) {
			handleChangeStatus(result.draggableId, destinationGroup.name)
			const [movedItem] = sourceGroups.todos.splice(source.index, 1);
			destinationGroup.todos.splice(destination.index, 0, movedItem);
		}
		setGroups(newGroups);
	};

	const handleChangeStatus = async (todoId: string, newGroupName: string) => {
		try {
			await updateMutation({ id: todoId, status: newGroupName });
		} catch (err: any) {
			showError(handleServerError(err.response));
		}
	};

	return (
		<div className="pt-2">
			<div className="row clearfix">
				<DragDropContext onDragEnd={onDragEnd}>
					{groups.map((column) => (
						<Droppable key={column.id} droppableId={column.id}>
							{(provided) => (
								<div
									className="col-md-3"
									{...provided.droppableProps}
									ref={provided.innerRef}>
									<div
										className="card"
										style={{
											minHeight: 500,
										}}>
										<div className="card-header d-flex align-items-center justify-content-center">
											<h5 className="fw-bold">{column.name}</h5>
										</div>
										<hr className="mt-0 mb-0" />
										{column.todos.map((todo, index) => (
											<Draggable key={todo.id} draggableId={todo.id} index={index}>
												{(provided) => (
													<div className="card pt-0 my-1"
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														ref={provided.innerRef}
														style={{ ...provided.draggableProps.style }}
													>
														<div className="card-body pt-1 row d-flex flex-column">
															<div className="position-relative">
																<div>
																	<h5 className="card-title py-2">{todo.title}</h5>
																	<p className="card-text">{todo.description}</p>
																</div>
																<div className="position-absolute top-0 end-0 mt-0 pb-5">
																	<IconButton aria-label="delete" size="medium" color="error" onClick={() => onDelete(todo.id)}>
																		<DeleteIcon fontSize="inherit" />
																	</IconButton>
																	<IconButton aria-label="edit" size="medium" color="primary" onClick={() => onUpdate(todo)}>
																		<EditOutlinedIcon fontSize="inherit" />
																	</IconButton>
																</div>
															</div>
														</div>
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

export default TodosDragAnDropContainer;
