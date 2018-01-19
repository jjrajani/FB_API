import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

// Needs Standard Account Access and business_management permissions
class CreateAdAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createAdAccount(this.state.name);
  };
  render() {
    return (
      <div>
        <h3>CreateAdAccountForm</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">AdAccount Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Ad Account Name"
          />
        </form>
      </div>
    );
  }
}

export default connect(null, {
  createAdAccount: actions.adActions.createAdAccount
})(CreateAdAccount);
