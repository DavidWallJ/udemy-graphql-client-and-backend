/**
 * Created by david on 7/6/17.
 */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/currentUser';
import mutation from '../mutations/logout';

// we refetch the query so that the authentication is rerun react sees there is no authentication and renders according to no auth
class Header extends Component {
  onLogoutClick()  {
    this.props.mutate({
      refetchQueries: [{ query }]
    });
  }

  renderButtons() {
    // this has been pulled off the query
    const { loading, user } = this.props.data;

    if (loading) { return <div/>;}

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>);
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

// you can find the results of the query on this.props.data
// this is the syntax for passing graphql two mutations/queries
// here it's one of each
export default graphql(mutation)(
  graphql(query)(Header)
);
