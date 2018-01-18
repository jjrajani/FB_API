import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

// Neds Basic Account Acces
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      business: ''
    };
  }
  handleChange = e => {
    console.log('handleChange', e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log('submitting page creation', this.state);
    this.props.createPage(this.state);
  };
  componentDidMount() {
    if (!this.props.businesses.length) {
      this.props.fetchBusinesses();
    }
  }
  render() {
    console.log('busineses', this.props.businesses);
    return (
      <div>
        <h3>CreatePageForm</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Page Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Page Name"
          />
          <select required name="business" onChange={this.handleChange}>
            <option value="">Select Business</option>
            {this.props.businesses.map(bus => {
              return <option value={bus.id}>{bus.name}</option>;
            })}
          </select>
        </form>
      </div>
    );
  }
}
function mapStateToProps({ business }) {
  return { businesses: business.list };
}
export default connect(mapStateToProps, {
  createPage: actions.pageActions.createPage,
  fetchBusinesses: actions.businessActions.fetchBusinesses
})(CreatePage);
