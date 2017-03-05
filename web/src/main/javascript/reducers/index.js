import { combineReducers } from "redux"
import search from "./search"
import user from "./user"

const reducer = combineReducers({
  search,
  user
});

export default reducer;
