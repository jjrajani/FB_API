import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Nav } from '../';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    };
  }
  componentDidMount() {
    this.props.initAuth();
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Nav />
          {!this.props.auth && (
            <button onClick={this.props.login}>Facebook Login</button>
          )}
          {this.props.auth && (
            <button onClick={this.props.logout}>Facebook Logout</button>
          )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, {
  initAuth: actions.authActions.initAuth,
  login: actions.authActions.login,
  logout: actions.authActions.logout
})(Header);
