import firebase from "../../config/firebase"
import { toast } from 'react-toastify';
import { ACTION_REQUEST, ACTION_REQUEST_END, LOGIN_REQUEST, LOGIN_REQUEST_END, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../types"
export const register = creds => {
    return async (dispatch) => {
        dispatch({
            type: ACTION_REQUEST
        })
        firebase
            .auth()
            .createUserWithEmailAndPassword(creds.email, creds.password)
            .then(data => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(data.user.uid)
                    .set({
                        email: creds.email
                    })
                    .then(res => {
                        dispatch({
                            type: REGISTER_SUCCESS
                        })
                        dispatch({
                            type: ACTION_REQUEST_END
                        })
                        toast.success("Account Created Successfully")
                    })
                    .catch(error => {
                        dispatch({
                            type: REGISTER_FAIL
                        })
                        dispatch({
                            type: ACTION_REQUEST_END
                        })
                        toast.warning(error)
                    })
            })
            .catch(error => {
                dispatch({
                    type: REGISTER_FAIL
                })
                dispatch({
                    type: ACTION_REQUEST_END
                })
                alert(error)
                toast.warning(error)
            })
    }
}

export const registeredComplete = () => {
    return (dispatch) => {
        dispatch({
            type: "REGISTER_COMPLETE"
        })
    }
}

export const login = creds => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        })
        firebase
            .auth()
            .signInWithEmailAndPassword(creds.email, creds.password)
            .then(data => {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(data.user.uid)
                    .onSnapshot(doc => {
                        console.log("daar", data.user.id)
                        dispatch({
                            type: LOGIN_SUCCESS,
                            user: { id: doc.id, ...doc.data() },
                            error: ""
                        })
                        dispatch({
                            type: LOGIN_REQUEST_END
                        })
                    })
            })
            .catch(error => {
                dispatch({
                    type: LOGIN_FAIL,
                    uid: "",
                    error: error
                })
                dispatch({
                    type: LOGIN_REQUEST_END
                })
                alert(error)
                toast.warning(error)
            })
    }
}

export const logout = () => {
    console.log("logit")
    return (dispatch) => {
        firebase
            .auth()
            .signOut()
            .then(data => {
                dispatch({
                    type: LOGOUT_SUCCESS,
                    uid: "",
                    user: "",
                    error: "",
                });
            })
            .catch((error) => {
                dispatch({
                    type: LOGOUT_FAIL,
                    uid: "",
                    error: error,
                });
            });
    }
}