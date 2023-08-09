import { combineReducers } from "redux";
import reducer from "./totoReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";
const rootReducer = combineReducers({
  tasks: reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
