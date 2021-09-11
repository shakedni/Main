import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, Badge, CardTitle, CardBody, CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchReports } from '../redux/actions/reportActions';
import moment from 'moment';
import { fetchUsers } from '../redux/actions/usersActions';
export class Maps extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            report: ""
        }
    }
    componentDidMount() {
        this.props.fetchReports()
        this.props.fetchUsers()
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    getUserEmail = (id) => {
        if (id != undefined) {
            if (this.props.users.length > 0) {
                let obj = this.props.users.find(user => user.id == id)
                return obj.email
            } else {
                return "N/A"
            }
        } else {
            return "N/A"
        }
    }

    render() {
        const { reports, users } = this.props
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        const containerStyle = {
            width: '98%',
            height: '90%',
        };
        return (
            <>

                <Map
                    google={this.props.google}
                    zoom={10}
                    style={mapStyles}
                    containerStyle={containerStyle}
                    initialCenter={{ lat: 31.4117257, lng: 35.0818155 }}
                >
                    {
                        reports && reports.map((report, index) => {
                            return (
                                <Marker key={index}
                                    position={{ lat: report.coordinates.latitude, lng: report.coordinates.longitude }}
                                    onClick={() => {
                                        this.setState({
                                            report: report
                                        })
                                        this.toggle();
                                    }
                                    }
                                />
                            )
                        })
                    }
                </Map>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Report</ModalHeader>
                    <ModalBody>
                        <Card className="report_card">
                            <CardBody>
                                <CardTitle tag="h5">{this.state.report.title}</CardTitle>
                                <CardText>{this.state.report.description}</CardText>
                                <Badge color="success">{this.state.report.status}</Badge>
                                <CardText className="mt-1">Reported By <b>{this.getUserEmail(this.state.report.created_by)}</b></CardText>
                                {
                                    this.state.report.createdAt != null ?
                                        <CardText className="mt-1">Created at <b>{moment.unix(this.state.report.createdAt.seconds).format("DD-MM-YYYY hh:mm:ss")}</b>{ }</CardText>
                                        :
                                        ""
                                }
                            </CardBody>
                        </Card>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}
export function mapStateToProps(state) {
    return {
        reports: state.report.report,
        users: state.user.users
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        fetchReports: () => dispatch(fetchReports()),
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: "AIzaSyCwVH3GTF_ZcPxr_diMo_AyVAW3A7GHbKQ"
})(Maps)))

