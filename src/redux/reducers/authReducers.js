import { ACTION_REQUEST, ACTION_REQUEST_END, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_REQUEST_END, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../types";

const initState = {
    authError: "",
    uid: "",
    requested: false,
    registered: false,
    user: null,
    loading: false
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                uid: action.user.id,
                user: { ...action.user },
                authError: "",
            }
        case LOGIN_FAIL:
            localStorage.clear()
            return {
                ...state,
                uid: "",
                authError: action.error.message,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                authError: "",
                registered: true,
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        case "REGISTER_COMPLETE":
            return {
                ...state,
                registered: false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authError: "",
                uid: "",
                registered: false,
                user: null
            };
        case ACTION_REQUEST:
            return {
                ...state,
                requested: true,
            }
        case ACTION_REQUEST_END:
            return {
                ...state,
                requested: false,
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOGIN_REQUEST_END:
            return {
                ...state,
                loading: false,
            }
        default:
            return {
                ...state
            }
    }
}
export default authReducer