import { ADD_TASK, DELETE_TASK, CHANGE_STATUS } from "./totoTypes";
import { Reducer } from "redux";

type Task = {
  id: number;
  status: string;
  name: string;
};

const initialState: { tasks: Task[] } = { tasks: [] };

const reducer: Reducer<{ tasks: Task[] }> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { tasks: [...state.tasks, action.data] };

    case DELETE_TASK:
      const array = state.tasks.filter((task) => task.id !== action.id!);
      const array2 = array.map((item, index) => {
        return { ...item, id: index };
      });

      return { tasks: array2 };

    case CHANGE_STATUS:
      const arraynew = state.tasks.map((item) => {
        if (item.id == action.id) {
          return { ...item, status: item.status == "done" ? "undone" : "done" };
        } else {
          return {
            ...item,
          };
        }
      });
      return { tasks: arraynew };
    default:
      return state;
  }
};

export default reducer;
