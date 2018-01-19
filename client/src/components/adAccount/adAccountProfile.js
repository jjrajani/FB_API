import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import CapmaignList from '../campaign/CampaignList';

const CURRENCIES = {
  USD: '$'
};
class AdAccountProfile extends Component {
  componentDidMount() {
    let { ad_account_id } = this.props.match.params;
    this.props.fetchAdAccount(ad_account_id);
  }
  render() {
    let { ad } = this.props;
    let currency = CURRENCIES[ad.currency] || '$';
    return (
      <div>
        <h1>AdAccountProfile</h1>
        <div className="general_specs">
          <p>Ad Account Name: {ad.name}</p>
          <p>Status: {ad.account_status}</p>
        </div>
        <div className="balance_specs">
          <p>
            Amount Spent: {currency}
            {ad.amount_spent}
          </p>
          <p>
            Balance: {currency}
            {ad.balance}
          </p>
        </div>
        <div className="relationships">
          <p>End Advertiser: {ad.end_advertiser_name}</p>
          <p>Funding Source: {ad.funding_source_details.display_string}</p>
        </div>
        <div className="other">
          <p>Age: {parseInt(ad.age, 10)} days</p>
        </div>
        <CapmaignList />
      </div>
    );
  }
}

function mapStateToProps({ ad }) {
  return { ad: ad.currentAd };
}

export default connect(mapStateToProps, {
  fetchAdAccount: actions.adActions.fetchAdAccount
})(withRouter(AdAccountProfile));
