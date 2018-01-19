import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    componentWillMount() {
      if (!this.props.auth) {
        console.log('no auth will mount');
        this.props.history.push('/');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        console.log('no auth will update');
        this.context.history.push('/');
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps({ auth }) {
    return { auth };
  }

  return connect(mapStateToProps)(withRouter(Authentication));
}
