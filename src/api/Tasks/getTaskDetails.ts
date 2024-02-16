import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Task } from "types/Task";
import { http } from "utils/Http";

export const getTaskDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if(_params.id){
    const { data } = await http.get(ROUTES.TASK + _params.id);
    return { task: { data: data as Task } }}
    else return null
  
};

export const useTaskDetailsQuery = (options: any) => {
  return useQuery([ROUTES.TASK, options], getTaskDetails);
};
