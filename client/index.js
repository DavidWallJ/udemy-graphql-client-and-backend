import React from 'react';
import ReactDOM from 'react-dom';
// ApolloClient works with backend
import ApolloClient, { createNetworkInterface } from 'apollo-client';
// ApolloProvider works with frontend react
import { ApolloProvider } from 'react-apollo';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './components/app';
import LoginForm from './components/loginForm';


// we're using cookies for authentication but graphql by default doesn't send along cookies when making queries
// the code below is the solution to this problem
// passed along in the ApolloClient
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  // every record will be run through this function and will return it's id
  // it's going to make sure everything can be identified
  // so everything must have an 'id'
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
        </Route>
      </Router>
    </ApolloProvider>
  )
}

ReactDOM.render(<Root />, document.querySelector('#root'))
