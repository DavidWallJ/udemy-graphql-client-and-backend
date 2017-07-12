/**
 * Created by david on 7/11/17.
 */
import React, { Component } from 'react';
import AuthForm from './authForm';
import mutation from '../mutations/signUp';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import query from '../queries/currentUser';

class SignUpForm extends Component {

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
  
  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      //reloads current user which refreshes the page and rechecks authentication and ensures header is up-to-date
      // if we don't have a user then we will see signup/login header
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Sign Up</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}


// this is how we associated the query with the component
// now when the query is run the component will update
// so we can use 'componentWillUpdate' to tack on some functionality to run after the query is completed

export default graphql(query)( 
  graphql(mutation)(SignUpForm)
)
