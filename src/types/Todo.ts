import { TODO } from "enums/enums";

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TODO;
};