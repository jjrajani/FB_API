import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  render() {
    return (
      <div className="login">
        <div className="nav-wrapper">
          {!this.props.auth && (
            <button onClick={this.props.login}>Facebook Login</button>
          )}
          {this.props.auth && (
            <button onClick={this.props.logout}>Facebook Logout</button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {
  login: actions.authActions.login,
  logout: actions.authActions.logout
})(Login);
