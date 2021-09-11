import { FETCH_REPORT, FETCH_MY_REPORT } from "../types";
import firebase from "../../config/firebase"
import { toast } from 'react-toastify';

export const fetchReports = () => {
    return (dispatch) => {
        firebase
            .firestore()
            .collection("reports")
            .onSnapshot((query) => {
                let reports = []
                query.docs.forEach(doc => {
                    reports.push({
                        id: doc.id,
                        createdAt: doc.data().createdAt.toDate(),
                        ...doc.data()
                    })
                })
                dispatch({
                    type: FETCH_REPORT,
                    reports
                })
            })
    }
}

export const fetchMyReports = (id) => {
    return (dispatch) => {
        firebase
            .firestore()
            .collection("reports")
            .where("created_by", "==", id)
            .onSnapshot(query => {
                let myReports = []
                query.docs.forEach(doc => {
                    myReports.push({
                        id: doc.id,
                        createdAt: doc.data().createdAt.toDate(),
                        ...doc.data()
                    })
                })
                dispatch({
                    type: FETCH_MY_REPORT,
                    myReports
                })
            })
    }
}

export const deleteReport = (id) => {
    return (dispatch) => {
        firebase
            .firestore()
            .collection("reports")
            .doc(id)
            .delete()
            .then(() => {
                toast.success("Report Deleted Successfully")
            })
            .catch(error => {
                alert(error.message)
            })
    }
}

export const addReport = (report) => {
    // console.log("report", report)
    return async (dispatch) => {

        var geoPoint = new firebase.firestore.GeoPoint(report.coordinates.lat, report.coordinates.lng)
        // console.log("gero", geoPoint)
        let customKey = firebase.firestore().collection("reports").doc()

        var fileName = report.myFile.name
        var type = report.myFile.type
        var finalType = type.split("/")[0]
        // let ext2 = fileName.split(".")[1]
        let ext2 = fileName.slice(fileName.lastIndexOf("."))
        var file_name = customKey.id + ext2.toLowerCase()

        var lets = await firebase
            .storage()
            .ref("event_files/" + customKey.id + ext2.toLowerCase())
            .put(report.myFile)

        var url = await lets.ref.getDownloadURL()

        if (geoPoint != null) {
            var newReport = {
                title: report.title,
                description: report.description,
                createdAt: firebase.firestore.Timestamp.now(),
                created_by: report.created_by,
                status: "pending",
                files: [
                    {
                        type: finalType,
                        url: url,
                        name: file_name
                    }
                ],
                coordinates: geoPoint
            }
            firebase
                .firestore()
                .collection("reports")
                .add(newReport)
                .then(() => {
                    toast.success("Report Added Successfully")
                })
                .catch(error => {
                    toast.warning(error)
                })
        }
    }
}

export const updateReport = (report) => {
    // console.log("report", report)
    return async (dispatch) => {
        if (report.myFile != "") {
            var desertRef = await firebase
                .storage()
                .ref()
                .child(`event_files/${report.myFileName}`);
            // Delete the file
            desertRef
                .delete()
                .then(function () {
                    console.log("deleted succcessfully");
                })
                .catch(function (error) {
                    console.log("error");
                });
        }

        var geoPoint = new firebase.firestore.GeoPoint(report.coordinates.lat, report.coordinates.lng)
        // console.log("gero", geoPoint)
        let customKey = firebase.firestore().collection("reports").doc()
        var url;
        if (report.myFile) {
            var fileName = report.myFile.name
            var type = report.myFile.type
            var finalType = type.split("/")[0]
            // let ext2 = fileName.split(".")[1]
            let ext2 = fileName.slice(fileName.lastIndexOf("."))
            var file_name = customKey.id + ext2.toLowerCase()

            var lets = await firebase
                .storage()
                .ref("event_files/" + customKey.id + ext2.toLowerCase())
                .put(report.myFile)

            url = await lets.ref.getDownloadURL()
        }
        if (geoPoint != null) {
            if (url) {
                var updateReport = {
                    title: report.title,
                    description: report.description,
                    created_by: report.created_by,
                    status: "pending",
                    files: [
                        {
                            type: finalType,
                            url: url,
                            name: file_name
                        }
                    ],
                    coordinates: geoPoint
                };
            } else {
                var updateReport = {
                    title: report.title,
                    description: report.description,
                    created_by: report.created_by,
                    status: "pending",
                    coordinates: geoPoint
                };
            }
            firebase
                .firestore()
                .collection("reports")
                .doc(report.id)
                .update(updateReport)
                .then(() => {
                    toast.success("Report Updated Successfully")
                })
                .catch(error => {
                    toast.warning(error)
                })
        }

    }
}