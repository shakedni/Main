import { combineReducers } from "redux";
import authReducer from "./authReducers";
import reportReducer from "./reportReducers";
import usersReducer from "./usersReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    report: reportReducer,
    user: usersReducer
})
export default rootReducer