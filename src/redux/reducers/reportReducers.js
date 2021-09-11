import { FETCH_REPORT, FETCH_MY_REPORT } from "../types"

const initState = {
    report: [],
    myReports: []
}

const reportReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_REPORT:
            return {
                ...state,
                report: action.reports
            }
        case FETCH_MY_REPORT:
            return {
                ...state,
                myReports: action.myReports

            }
        default: return {
            ...state
        }
    }
}
export default reportReducer