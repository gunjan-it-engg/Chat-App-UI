import { combineReducers } from "redux";
import authentication from "./authencation"
import authdialog from "./authdialog";

const AllUserReducer = combineReducers({
    auth : authentication,
    authdialog: authdialog,
  });
  
  export default AllUserReducer;