import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Spinner, Label, Input, Container, Card } from 'reactstrap';
import logo from "../assets/images/logo.png"
import check from "../assets/images/check.png"
import { Link, Redirect } from 'react-router-dom';
import { register } from '../redux/actions/authActions';
import { connect } from 'react-redux';
export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = e => {
        e.preventDefault();
        let creds = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        this.props.register(creds);
        this.setState({
            email: "",
            password: ""
        })
    }
    redirect = () => {
        this.props.history.push("/auth/login")
    }
    render() {
        const { loading } = this.props
        return (
            <>
                <Container fluid className="auth-container">
                    <Row className="justify-content-center">
                        <Col md={6} className="p-0 text-center">
                            <img src={logo} alt="logo" className="mb-2 mt-5" style={{ height: "100px", width: "80px" }} />
                            <h4 className="text-white mt-5"
                                style={{ fontSize: "36px" }}
                            >
                                <b>
                                    Get Started with Report
                                </b>
                            </h4>
                            <h4 className="text-white mt-5"
                                style={{ fontSize: "36px", fontWeight: 200 }}
                            >
                                Get Things Done Quickly
                            </h4>
                            <img src={check} alt="check" height="200px" className="mt-5" />
                        </Col>
                        <Col md={6} className="p-0">
                            <div className="text-center register">
                                <div className="auth-card">
                                    <h2 className="mb-5 mt-5">Create Account</h2>
                                    <Row className="justify-content-center">
                                        <Col md={6} className="mt-5">
                                            <Form
                                                onSubmit={
                                                    this.handleRegister
                                                }
                                            >
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <Input className="input" required type="email" name="email" onChange={this.handleChange} />
                                                            <Label className="left">Email</Label>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <FormGroup>
                                                            <Input className="input" required type="password" name="password" onChange={this.handleChange} />
                                                            <Label className="left">Password</Label>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Button
                                                    className="mt-5"
                                                    style={{ background: "#01D472", padding: 10, borderRadius: 20, width: "80%", fontSize: 30, border: "none" }}
                                                >
                                                    {loading ? <Spinner size="md" /> : "Create Account"}
                                                </Button>
                                                {
                                                    this.props.registered ? this.redirect() : null
                                                }
                                                <Link to="/auth/login">
                                                    <h6 className="mt-4" style={{ cursor: "pointer", color: "black" }}>
                                                        <b><u>
                                                            Alreay Have an Account? Login
                                                        </u></b>
                                                    </h6>
                                                </Link>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export function mapStateToProps(state) {
    return {
        loading: state.auth.requested,
        registered: state.auth.registered
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        register: (creds) => dispatch(register(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
