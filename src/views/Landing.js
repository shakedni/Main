import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    Container,
} from 'reactstrap'
import Footer from '../components/Footer'
import Maps from './Maps'

export class Landing extends Component {
    render() {
        const { uid } = this.props
        if (!uid) return <Redirect to="/auth/login" />
        return (
            <>
                <Container fluid style={{ minHeight: "80vh", marginBottom: "5rem" }}>
                    <Maps />
                </Container>
            </>
        )
    }
}
export function mapStateToProps(state) {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps, null)(Landing)
