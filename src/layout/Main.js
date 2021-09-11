import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router';
import Footer from '../components/Footer';
import Header from "../components/Header"
import routes from '../routes'
export class Main extends Component {
    getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/main") {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };
    render() {
        return (
            <>
                <Header />
                <div>
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect from="*" to="/main/index" />
                    </Switch>
                </div>
                <Footer />
            </>
        )
    }
}

export default Main
