import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class BusinessList extends Component {
  componentDidMount() {
    this.props.fetchBusinesses();
  }
  render() {
    console.log('business props', this.props);
    return (
      <div>
        BusinessList<ul>
          {this.props.businesses.map(bus => {
            return (
              <li key={bus.id}>
                <Link
                  to={`/business/${bus.id}`}
                  onClick={this.props.fetchBusiness.bind(this, bus.id)}
                >
                  {bus.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ business }) {
  return { businesses: business.list };
}

export default connect(mapStateToProps, {
  fetchBusinesses: actions.businessActions.fetchBusinesses,
  fetchBusiness: actions.businessActions.fetchBusiness
})(BusinessList);
