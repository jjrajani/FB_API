import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class CampaignList extends Component {
  componentDidMount() {
    let { ad_account_id } = this.props.match.params;
    this.props.fetchCampaigns(ad_account_id);
  }
  render() {
    let { campaigns } = this.props;
    console.log('campaigns', campaigns);
    return <div>CampaignList</div>;
  }
}

function mapStateToProps({ campaign }) {
  return { campaigns: campaign.list };
}

export default connect(mapStateToProps, {
  fetchCampaigns: actions.campaignActions.fetchCampaigns
})(withRouter(CampaignList));
