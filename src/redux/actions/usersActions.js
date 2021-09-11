import { FETCH_USER } from "../types";
import firebase from "../../config/firebase"

export const fetchUsers = () => {
    return (dispatch) => {
        firebase
            .firestore()
            .collection("users")
            .onSnapshot((query) => {
                let users = []
                query.docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                dispatch({
                    type: FETCH_USER,
                    users
                })
            })
    }
}