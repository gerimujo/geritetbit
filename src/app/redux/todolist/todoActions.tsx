import { ADD_TASK } from "./totoTypes";
import { DELETE_TASK } from "./totoTypes";
import { CHANGE_STATUS } from "./totoTypes";

type Task = {
  id: number;
  status: string;
  name: string;
};
export const AddTask = (task: Task) => {
  return {
    type: ADD_TASK,
    data: task,
  };
};

export const Deletetask = (id: number) => {
  return {
    type: DELETE_TASK,
    id: id,
  };
};

export const ChangeStatus = (id: number) => {
  return {
    type: CHANGE_STATUS,
    id: id,
  };
};
