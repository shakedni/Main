import React, { Component } from 'react'
import { Row, Col, Container } from 'reactstrap'
import logo from "../assets/images/logo.png"
export class Footer extends Component {
    render() {
        return (
            <>
                <footer className="footer">
                    <Container fluid className="bottom-footer">
                        <Row className="justify-content-center">
                            <Col md={5}>
                                <div className="d-flex align-items-center">
                                    <img src={logo} alt="" height="150px" />
                                    <h3 className="mn-2">Reporting Main Platform</h3>
                                </div>
                            </Col>
                            <Col md={5}>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem.
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        )
    }
}

export default Footer
