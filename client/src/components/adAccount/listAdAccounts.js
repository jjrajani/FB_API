import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ListAdAccountsFromParams from './ListAdAccountsFromParams';
import ListAdAccountsFromSelector from './ListAdAccountsFromSelector';
// import moment from 'moment';

class ListAdAccounts extends Component {
  componentDidMount() {
    let { business_id } = this.props.match.params;
    if (business_id) this.props.fetchAdAccounts(business_id);
    else this.props.fetchBusinesses();
  }
  render() {
    let { business_id } = this.props.match.params;
    return (
      <div>
        <h3>List Ad Accounts</h3>
        {business_id ? (
          <ListAdAccountsFromParams />
        ) : (
          <ListAdAccountsFromSelector />
        )}
      </div>
    );
  }
}

function mapStateToProps({ ad, business }) {
  return { ads: ad.list, businesses: business.list };
}

export default connect(mapStateToProps, {
  fetchAdAccounts: actions.adActions.fetchAdAccounts,
  fetchBusinesses: actions.businessActions.fetchBusinesses,
  fetchAdAccount: actions.adActions.fetchAdAccount
})(withRouter(ListAdAccounts));
