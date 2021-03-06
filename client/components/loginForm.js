/**
 * Created by david on 7/10/17.
 */
import React, { Component } from 'react';
import AuthForm from './authForm';
import mutation from '../mutations/login';
import { graphql } from 'react-apollo';
import query from '../queries/currentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
  // component level state without redux
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // this.props // the old, current set of props
    // nextProps // the next set of props that will be in place when the component rerenders

    if (!this.props.data.user && nextProps.data.user) {
      // redirect to dashboard
      hashHistory.push('/dashboard');
    }
  }

  // we pass this function down below as 'onSubmit' to authForm.js where the email and password inputs exist
  // it will be accessible on the props object as 'onSubmit'
  // we then call this this onSubmit function inside of authForm's onSubmit function
  // its a react style callback function
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      // one issue with refetch is that if we have a .then after this it won't wait for refetch to complete
      // solution: running a query causes the associated components to rerender so we can use 'componentWillUpdate' to tack on something after refetch is finished
      refetchQueries: [{ query }]
      // a little trick to see whats in the res of the catch
      // call res => { debugger } inside catch
      // then check the res.graphQLErrors in the console
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

// this is how we associated the query with the component
// now when the query is run the component will update
// so we can use 'componentWillUpdate' to tack on some functionality to run after the query is completed

export default graphql(query)(
  graphql(mutation)(LoginForm)
);
