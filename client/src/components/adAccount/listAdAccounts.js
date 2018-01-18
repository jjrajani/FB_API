import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
// import moment from 'moment';

class ListAdAccounts extends Component {
  componentDidMount() {
    let { business_id } = this.props.match.params;
    this.props.fetchAdAccounts(business_id);
  }
  render() {
    let { business_id } = this.props.match.params;
    return (
      <div>
        <h3>ListAdAccounts</h3>
        <ul>
          {this.props.ads.map(ad => {
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
      </div>
    );
  }
}

function mapStateToProps({ ad }) {
  return { ads: ad.list };
}

export default connect(mapStateToProps, {
  fetchAdAccounts: actions.adActions.fetchAdAccounts,
  fetchAdAccount: actions.adActions.fetchAdAccount
})(withRouter(ListAdAccounts));
