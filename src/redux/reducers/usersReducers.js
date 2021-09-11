import { FETCH_USER } from "../types"

const initState = {
    users: []
}

const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                users: action.users
            }
        default: return {
            ...state
        }
    }
}
export default usersReducer