import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import moment from 'moment';
import ListAdAccounts from '../adAccount/listAdAccounts';
import CreateAdAccount from '../adAccount/createAdAccount';

class BusinessDetail extends Component {
  componentDidMount() {
    let businessId = this.props.match.params.business_id;
    this.props.fetchBusiness(businessId);
  }
  render() {
    let { name, link, updated_by, updated_time } = this.props.business;
    return (
      <div>
        <h1>BusinessDetail</h1>
        <div className="nav" />
        <a href={link}>{name}</a>
        <p>
          Updated By: {updated_by.name} on{' '}
          {moment(updated_time).format('MMMM DD YYYY')}
        </p>
        <CreateAdAccount />
        <ListAdAccounts />
      </div>
    );
  }
}

function mapStateToProps({ business }) {
  return { business: business.currentBusiness };
}

export default connect(mapStateToProps, {
  fetchBusiness: actions.businessActions.fetchBusiness
})(withRouter(BusinessDetail));
