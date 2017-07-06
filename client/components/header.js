/**
 * Created by david on 7/6/17.
 */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/currentUser';

class Header extends Component {
  render() {
    console.log(this.props.data);
    return (
      <div>
        Header Component 
      </div>
    );
  }
}

// you can find the results of the query on this.props.data
export default graphql(query)(Header);
