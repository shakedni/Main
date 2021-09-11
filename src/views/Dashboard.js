import React, { Component } from 'react'
import moment from 'moment';
import {
    Button, Card, CardBody, CardHeader, Form, FormGroup, Label, Input,
    Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Col,
    Badge,
    Row
} from 'reactstrap'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    InfoWindow,
    Marker,
} from "react-google-maps";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Marker as GoogleMarker } from 'google-maps-react';
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import { addReport, deleteReport, fetchMyReports, updateReport } from '../redux/actions/reportActions';
Geocode.setApiKey("AIzaSyCwVH3GTF_ZcPxr_diMo_AyVAW3A7GHbKQ");
export class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            title: "",
            editReport: "",
            description: "",
            myFile: "",
            myFileName: "",
            reportId: '',
            viewModal: false,
            editModal: false,
            geoPoint: "",
            address: "",
            defaultMapPosition: "",
            mapPosition: {
                lat: 31.4117257,
                lng: 35.0818155,
            },
            defaultMarkerPosition: "",
            markerPosition: {
                lat: 0,
                lng: 0,
            },
        }
    }

    componentDidMount() {
        this.props.fetchMyReports(this.props.uid);
        navigator.geolocation.getCurrentPosition(pos => {
            this.setState({
                mapPosition: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                },
                markerPosition: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            })
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    viewToggle = () => {
        this.setState({
            viewModal: !this.state.viewModal
        })
    }
    editToggle = () => {
        this.setState({
            editModal: !this.state.editModal
        })
    }
    handlefieldChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFile = e => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })
    }
    moveMarker = (coord) => {
        this.setState({
            mapPosition: {
                lat: coord.latLng.lat(),
                lng: coord.latLng.lng()
            },
            markerPosition: {
                lat: coord.latLng.lat(),
                lng: coord.latLng.lng()
            }
        })
    }
    editMoveMark = (coord) => {
        this.setState({
            mapPosition: {
                lat: coord.latLng.lat(),
                lng: coord.latLng.lng()
            },
            markerPosition: {
                lat: coord.latLng.lat(),
                lng: coord.latLng.lng()
            }
        })
    }
    handleChange = (address) => {
        this.setState({ address });
    };
    handleSelect = async (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng =>
                // console.log("lat", latLng)
                this.setState({
                    mapPosition: { lat: latLng.lat, lng: latLng.lng },
                    markerPosition: { lat: latLng.lat, lng: latLng.lng },
                    selectedAddress: address,
                })
            )
            .catch((error) => console.error("Error", error));
    };
    onInfoWindowClose = (event) => { };

    handleSubmit = e => {
        e.preventDefault();
        let obj = {
            myFile: this.state.myFile,
            title: this.state.title,
            description: this.state.description,
            coordinates: this.state.mapPosition,
            created_by: this.props.uid
        }
        if (obj != null) {
            this.props.addReport(obj)
        }
        this.setState({
            title: "",
            description: "",
            myFile: ""
        })
        this.toggle()
    }

    handleUpdate = e => {
        e.preventDefault()
        let obj = {
            myFile: this.state.myFile,
            myFileName: this.state.myFileName,
            title: this.state.title,
            description: this.state.description,
            coordinates: this.state.mapPosition,
            created_by: this.props.uid,
            id: this.state.reportId
        }
        this.props.updateReport(obj)
        this.editToggle()
    }

    render() {
        const { myReports } = this.props
        const mapStyles = {
            width: '100%',
            height: '100%',
        };

        // console.log("lat", this.state.markerPosition.lat)
        // console.log("lng", this.state.markerPosition.lng)

        return (
            <>
                <Container className="mt-5 mb-5">
                    <Card className="table-card">
                        <CardHeader className="bg-white">
                            <div className="d-flex">
                                <h4>My Events</h4>
                                <Button className="ml-auto" color="info" onClick={this.toggle}>Add Event</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>Files</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Created at</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myReports && myReports.map((report, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{
                                                        report.files.map(file => {
                                                            return (
                                                                file.type == "audio"
                                                                    ?
                                                                    <audio controls src={file.url}> </audio>
                                                                    :
                                                                    <img src={file.url} height="100px" width="100px" />
                                                            )
                                                        })
                                                    }</td>
                                                    <th>{report.title}</th>
                                                    <td>{report.description}</td>
                                                    <td>{moment.unix(report.createdAt.seconds).format("MM-DD-YYYY hh:mm:ss")}</td>
                                                    <td>{report.status}</td>
                                                    <td>
                                                        <Button color="primary"
                                                            onClick={e => {
                                                                this.setState({
                                                                    geoPoint: report.coordinates
                                                                })
                                                                this.viewToggle()
                                                            }}
                                                        >
                                                            <i className="fa fa-map-marker-alt"></i>
                                                        </Button>{" "}
                                                        <Button color="info" onClick={() => {
                                                            this.setState({
                                                                title: report.title,
                                                                description: report.description,
                                                                reportId: report.id,
                                                                mapPosition: {
                                                                    lat: report.coordinates._lat,
                                                                    lng: report.coordinates._long
                                                                },
                                                                markerPosition: {
                                                                    lat: report.coordinates._lat,
                                                                    lng: report.coordinates._long
                                                                },
                                                                myFileName: report.files[0].name
                                                            })
                                                            this.editToggle()
                                                        }}>
                                                            <i className="fas fa-pencil"></i>
                                                        </Button>{" "}
                                                        <Button color="danger"
                                                            onClick={() => {
                                                                this.props.deleteReport(report.id)
                                                            }}>
                                                            <i className="fas fa-trash"></i>
                                                        </Button>{" "}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Container>


                {/* ********* View Modal *********** */}


                <Modal isOpen={this.state.viewModal} toggle={this.state.viewToggle} centered size="lg">
                    <ModalHeader toggle={this.viewToggle}>Location</ModalHeader>
                    <ModalBody
                        style={{
                            height: 500,
                            width: "100%"
                        }}
                    >
                        <Row>
                            <Map
                                google={this.props.google}
                                zoom={8}
                                style={mapStyles}
                                initialCenter={{ lat: 31.4117257, lng: 35.0818155 }}
                            >
                                {this.state.geoPoint != undefined
                                    ?
                                    <GoogleMarker
                                        position={{ lat: this.state.geoPoint._lat, lng: this.state.geoPoint._long }}
                                    />
                                    :
                                    null
                                }
                            </Map>
                        </Row>
                    </ModalBody>
                    <ModalFooter className="mt-2">
                        <Button color="danger" onClick={this.viewToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                {/* ********* End View Modal *********** */}


                {/* ********* Edit Event Modal *********** */}


                <Modal isOpen={this.state.editModal} toggle={this.editToggle} centered>
                    <ModalHeader toggle={this.editToggle}>Update Event</ModalHeader>
                    <Form onSubmit={
                        this.handleUpdate
                    }>
                        <ModalBody>

                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    required
                                    onChange={this.handlefieldChange}
                                    defaultValue={this.state.title}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    required
                                    onChange={this.handlefieldChange}
                                    defaultValue={this.state.description}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Files (Audio/Image)</Label>
                                <Input type="file" name="myFile"
                                    onChange={this.handleFile}
                                />
                            </FormGroup>
                            <div className="form-group text-left" style={{
                                height: "400px"
                            }}>
                                <PlacesAutocomplete
                                    className="autocomplete-signup"
                                    searchOptions={{
                                        componentRestrictions: { country: ["il"] },
                                    }}
                                    required
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                >
                                    {({
                                        getInputProps,
                                        suggestions,
                                        getSuggestionItemProps,
                                        loading,
                                    }) => (
                                        <div>
                                            <Input
                                                {...getInputProps({
                                                    placeholder: "Search Places ...",
                                                    className: "location-search-input",
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion) => {
                                                    const className = suggestion.active
                                                        ? "suggestion-item--active"
                                                        : "suggestion-item";
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <Row className="mx-1">
                                    <Map
                                        google={this.props.google}
                                        zoom={9}
                                        style={{
                                            height: "97%",
                                            width: "100%"
                                        }}
                                        containerStyle={{
                                            height: "50%",
                                            width: "93%"
                                        }}

                                        initialCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                                        center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                                    >
                                        {/* InfoWindow on top of marker */}
                                        {this.state.selectedAddress && (
                                            <InfoWindow
                                                onClose={this.onInfoWindowClose}
                                                position={{
                                                    lat: this.state.markerPosition.lat + 0.0118,
                                                    lng: this.state.markerPosition.lng,
                                                }}
                                            >
                                                <div>
                                                    <span style={{ padding: 0, margin: 0 }}>
                                                        {this.state.selectedAddress}
                                                    </span>
                                                </div>
                                            </InfoWindow>
                                        )}
                                        {/*Marker*/}
                                        <GoogleMarker
                                            draggable={true}
                                            onDragend={(t, map, coord) => this.editMoveMark(coord)}
                                            position={{
                                                lat: this.state.markerPosition.lat,
                                                lng: this.state.markerPosition.lng,
                                            }}
                                        />
                                        <Marker />
                                    </Map>
                                </Row>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit">Update</Button>{' '}
                            <Button color="danger" onClick={this.editToggle}>Cancel</Button>

                        </ModalFooter>
                    </Form>
                </Modal>
                {/* ********* End Edit Event Modal *********** */}


                {/* ********* Add Event Modal *********** */}


                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add an Event</ModalHeader>
                    <Form onSubmit={
                        this.handleSubmit
                    }>
                        <ModalBody>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    required
                                    onChange={this.handlefieldChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    required
                                    onChange={this.handlefieldChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>File (Audio/Image)</Label>
                                <Row>
                                    <Col xs={6}>
                                        <Input
                                            type="file"
                                            name="myFile"
                                            required
                                            onChange={this.handleFile}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>
                            <div className="form-group text-left" style={{
                                height: "400px"
                            }}>
                                <PlacesAutocomplete
                                    className="autocomplete-signup"
                                    searchOptions={{
                                        componentRestrictions: { country: ["il"] },
                                    }}
                                    required
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    onSelect={this.handleSelect}
                                >
                                    {({
                                        getInputProps,
                                        suggestions,
                                        getSuggestionItemProps,
                                        loading,
                                    }) => (
                                        <div>
                                            <Input
                                                {...getInputProps({
                                                    placeholder: "Search Places ...",
                                                    className: "location-search-input",
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map((suggestion) => {
                                                    const className = suggestion.active
                                                        ? "suggestion-item--active"
                                                        : "suggestion-item";
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                                <Row className="mx-1">
                                    <Map
                                        google={this.props.google}
                                        zoom={9}
                                        style={{
                                            height: "97%",
                                            width: "100%"
                                        }}
                                        containerStyle={{
                                            height: "50%",
                                            width: "93%"
                                        }}

                                        initialCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                                        center={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                                    >
                                        {/* InfoWindow on top of marker */}
                                        {this.state.selectedAddress && (
                                            <InfoWindow
                                                onClose={this.onInfoWindowClose}
                                                position={{
                                                    lat: this.state.markerPosition.lat + 0.0118,
                                                    lng: this.state.markerPosition.lng,
                                                }}
                                            >
                                                <div>
                                                    <span style={{ padding: 0, margin: 0 }}>
                                                        {this.state.selectedAddress}
                                                    </span>
                                                </div>
                                            </InfoWindow>
                                        )}
                                        {/*Marker*/}
                                        <GoogleMarker
                                            draggable={true}
                                            onDragend={(t, map, coord) => this.moveMarker(coord)}
                                            position={{
                                                lat: this.state.markerPosition.lat,
                                                lng: this.state.markerPosition.lng,
                                            }}
                                        />
                                        {/* <Marker /> */}
                                    </Map>
                                </Row>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" type="submit">Save</Button>{' '}
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>

                        </ModalFooter>
                    </Form>
                </Modal>
                {/* ********* End Add Event Modal *********** */}
            </>
        )
    }
}

export function mapStateToProps(state) {
    return {
        myReports: state.report.myReports,
        uid: state.auth.uid
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        fetchMyReports: (id) => dispatch(fetchMyReports(id)),
        deleteReport: (id) => dispatch(deleteReport(id)),
        addReport: (report) => dispatch(addReport(report)),
        updateReport: (report) => dispatch(updateReport(report)),
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: "AIzaSyCwVH3GTF_ZcPxr_diMo_AyVAW3A7GHbKQ"
})(Dashboard)))
