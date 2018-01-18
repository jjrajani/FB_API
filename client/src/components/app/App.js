import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './App.css';

import {
  Header,
  Landing,
  Businesses,
  BusinessDetail,
  Pages,
  AdAccountProfile
} from '../';
// <Route exact path="/business/:business_id" component={BusinessProfile}/>
// <Route exact path="/businesses" component={Business}/>

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/businesses" component={Businesses} />
            <Route
              exact
              path="/business/:business_id"
              component={BusinessDetail}
            />
            <Route
              exact
              path="/business/:business_id/ad_account/:ad_account_id"
              component={AdAccountProfile}
            />
            <Route exact path="/pages" component={Pages} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions.authActions)(App);
