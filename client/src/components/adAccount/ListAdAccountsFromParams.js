import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ListAdAccountsFromParams extends Component {
  componentDidMount() {
    let { business_id } = this.props.match.params;
    this.props.fetchAdAccounts(business_id);
  }
  render() {
    let { business_id } = this.props.match.params;
    let ads = this.props.ads[business_id] || [];
    return (
      <ul>
        {ads.map(ad => {
          return (
            <li key={ad.id}>
              <Link
                to={`/business/${business_id}/ad_account/${ad.id}`}
                onClick={this.props.fetchAdAccount.bind(this, ad.id)}
              >
                <p>Ad Account Name: {ad.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

function mapStateToProps({ ad }) {
  return { ads: ad.list };
}

export default connect(mapStateToProps, {
  fetchAdAccounts: actions.adActions.fetchAdAccounts,
  fetchAdAccount: actions.adActions.fetchAdAccount
})(withRouter(ListAdAccountsFromParams));
