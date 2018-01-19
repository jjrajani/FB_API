import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    let { auth } = this.props;
    return (
      <div>
        {auth && (
          <div>
            <h1>Welcome!</h1>
          </div>
        )}
        {!auth && (
          <div>
            <h1>Please Login to Get Started</h1>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
