/**
 * Created by david on 7/6/17.
 */
import React, { Component } from 'react';
import Header from './header';

const App = (props) => {
  return (
    <div>
      <Header/>
      {props.children}
    </div>
  );
};

export default App;
