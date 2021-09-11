import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'
import { logout } from '../redux/actions/authActions'

export class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const { logout } = this.props
        return (
            <>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Reporting Panel</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/main/dashboard">Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/auth/login" onClick={logout}>Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </>
        )
    }
}
export function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}
export default connect(null, mapDispatchToProps)(Header)
