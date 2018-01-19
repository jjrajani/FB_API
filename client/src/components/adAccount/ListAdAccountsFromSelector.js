import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ListAdAccountsFromSelector extends Component {
  constructor(props) {
    super(props);
    this.state = { business_id: null };
  }
  componentDidMount() {
    // this.props.fetchAdAccounts(business_id);
  }
  handleChange = e => {
    if (e.target.value === 'ALL') {
    } else {
      this.setState({ business_id: e.target.value });
      this.props.fetchAdAccounts(e.target.value);
    }
  };
  render() {
    let { business_id } = this.state;
    let ads = this.props.ads[business_id] || [];
    return (
      <div>
        <select onChange={this.handleChange} name="business_id">
          <option>Select A Business</option>
          {ads.map(bus => {
            return (
              <option key={bus.id} value={bus.id}>
                {bus.name}
              </option>
            );
          })}
        </select>
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
      </div>
    );
  }
}

function mapStateToProps({ ad, business }) {
  return { ads: ad.list, businesses: business.list };
}

export default connect(mapStateToProps, {
  fetchAdAccounts: actions.adActions.fetchAdAccounts,
  fetchAdAccount: actions.adActions.fetchAdAccount
})(withRouter(ListAdAccountsFromSelector));
