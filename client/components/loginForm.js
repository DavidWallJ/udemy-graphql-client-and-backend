/**
 * Created by david on 7/10/17.
 */
import React, { Component } from 'react';
import AuthForm from './authForm';
import mutation from '../mutations/login';
import { graphql } from 'react-apollo';

class LoginForm extends Component {
  // we pass this function down below as 'onSubmit' to authForm.js where the email and password inputs exist
  // it will be accessible on the props object as 'onSubmit'
  // we then call this this onSubmit function inside of authForm's onSubmit function
  // its a react style callback function
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password }
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default(mutation)(LoginForm);
