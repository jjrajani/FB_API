import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

// Neds Basic Account Acces
class CreateBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      page_id: ''
    };
  }
  componentDidMount() {
    // if (!this.props.pages.length) this.props.fetchPages();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createBusiness(this.state);
  };
  render() {
    return (
      <div>
        <h3>CreateBusinessForm</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Business Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Business Name"
          />
        </form>
      </div>
    );
  }
}

// function mapStateToProps({ page }) {
//   return { pages: page.list };
// }

export default connect(null, {
  createBusiness: actions.businessActions.createBusiness
  // fetchPages: actions.pageActions.fetchPages
})(CreateBusiness);
