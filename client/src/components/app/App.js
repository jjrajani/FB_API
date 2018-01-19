import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './App.css';

import {
  Header,
  Nav,
  Landing,
  Businesses,
  BusinessDetail,
  AdAccounts,
  AdAccountProfile,
  Pages
} from '../';
// <Route exact path="/business/:business_id" component={BusinessProfile}/>
// <Route exact path="/businesses" component={Business}/>
import requireAuth from '../hoc/require_authentication';

class App extends Component {
  componentDidMount() {
    this.props.initAuth();
  }
  render() {
    return (
      <div className="app-container">
        <BrowserRouter className="router">
          <div>
            <Header />
            <div className="content-wrapper">
              <div className="left-nav">
                <Nav />
              </div>
              <div className="content">
                <Route exact path="/" component={Landing} />
                <Route
                  exact
                  path="/businesses"
                  component={requireAuth(Businesses)}
                />
                <Route
                  exact
                  path="/business/:business_id"
                  component={requireAuth(BusinessDetail)}
                />
                <Route
                  exact
                  path="/business/:business_id/ad_account/:ad_account_id"
                  component={requireAuth(AdAccountProfile)}
                />
                <Route
                  exact
                  path="/ad_accounts"
                  component={requireAuth(AdAccounts)}
                />
                <Route exact path="/pages" component={requireAuth(Pages)} />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {
  initAuth: actions.authActions.initAuth
})(App);
