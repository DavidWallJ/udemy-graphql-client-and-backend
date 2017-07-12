/**
 * Created by david on 7/12/17.
 */
// this is a HOC (higher order component)
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/currentUser';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate (nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        hashHistory.push('/login');
      }
    }

    render () {
      // pass through the component and it's props
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth)
};