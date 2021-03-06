import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ListAdAccounts from './listAdAccounts';
// import CreateAdAccount from './createAdAccount';
// <CreateAdAccount />

// Select Business to get business_id
// Use Business Id to get list of Ad Accounts
// Use Business Id to create new Ad Accounts
class AdAccounts extends Component {
  componentDidMount() {
    if (!this.props.business.name) {
      // let businessId = this.props.match.params.business_id;
      // this.props.fetchBusiness(businessId);
    }
  }
  render() {
    // let businessName = this.props.business.name;
    return (
      <div>
        <h1>AdAccounts</h1>
        <ListAdAccounts />
      </div>
    );
  }
}

function mapStateToProps({ business }) {
  return { business };
}

export default connect(mapStateToProps, {
  fetchBusiness: actions.businessActions.fetchBusiness
})(withRouter(AdAccounts));
