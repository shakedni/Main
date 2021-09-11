import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import Main from "./layout/Main";
import Auth from "./layout/Auth";
import { connect } from "react-redux";
import React, { Component } from 'react'

export class App extends Component {
  render() {
    const { uid } = this.props
    return (
      <>
        <BrowserRouter>
          {uid
            ?
            <Switch>
              <Route path="/main" render={props => <Main {...props} />} />
              <Redirect from="/" to="/main" />
            </Switch>
            :
            <Switch>
              <Route path="/auth" render={props => <Auth {...props} />} />
              <Redirect from="/" to="/auth/login" />
            </Switch>
          }
        </BrowserRouter>

      </>
    );
  }
}


export function mapStateToProps(state) {
  return {
    uid: state.auth.uid
  }
}
export default connect(mapStateToProps, null)(App);
