import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import routes from '../routes'
export class Auth extends Component {
    getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                )
            } else {
                return null
            }
        })
    }
    render() {
        return (
            <>
                <Switch>
                    {this.getRoutes(routes)}
                    <Redirect from="*" to="/auth/login" />
                </Switch>
            </>
        )
    }
}

export default Auth
