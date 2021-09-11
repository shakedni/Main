import React, { Component } from 'react'
import { Col, Row, Button, Form, FormGroup, Spinner, Label, Input, Container, Card } from 'reactstrap';
import logo from "../assets/images/logo.png"
import logo_side from "../assets/images/login_side_img.png"
import { Link, Redirect } from 'react-router-dom';
import { login, registeredComplete } from '../redux/actions/authActions';
import { connect } from 'react-redux';
export class Login extends Component {
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
    componentDidMount() {
        this.props.registerComplete()
    }

    handleLogin = e => {
        e.preventDefault()
        let creds = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(creds);
        this.setState({
            email: "",
            password: ""
        })
    }

    render() {
        const { uid, loading } = this.props
        if (uid) return <Redirect to="/main/index" />
        return (
            <>
                <Container fluid className="auth-container">
                    <Row className="justify-content-center">
                        <Col md={6} className="p-0">
                            <div className="text-center login">
                                <div className="auth-card">
                                    <img src={logo} alt="logo" className="mb-2 mt-5" style={{ height: "100px", width: "80px" }} />
                                    <h2 className="mb-5 mt-5" style={{ color: "#5E862A" }}>Reporting Platform</h2>
                                    <Row className="justify-content-center">
                                        <Col md={6}>
                                            <Form onSubmit={this.handleLogin}>
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
                                                {/* <Link to="/"> */}
                                                <Button
                                                    className="mt-5 px-5"
                                                    type="submit"
                                                    style={{ background: "#01D472", padding: 10, borderRadius: 20, fontSize: 30, border: "none" }}
                                                >
                                                    {loading ? <Spinner size="md" /> : "Login"}
                                                </Button>
                                                {/* </Link> */}
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="p-0 text-center">
                            <div className="d-flex justify-content-center mt-3">
                                <h6 className="mt-2 mx-2">
                                    <b className="text-white">Don't have an account?</b>
                                </h6>
                                <Link to="/auth/register">
                                    <Button
                                        style={{ background: '#01D472', padding: 10, borderRadius: 10, border: "none" }}
                                    >
                                        Create Your Account
                                    </Button>
                                </Link>
                            </div>
                            <img src={logo_side} alt="logo_side" className="mt-3" height="600px" />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export function mapStateToProps(state) {
    return {
        uid: state.auth.uid,
        loading: state.auth.loading
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        login: (creds) => dispatch(login(creds)),
        registerComplete: () => dispatch(registeredComplete())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
