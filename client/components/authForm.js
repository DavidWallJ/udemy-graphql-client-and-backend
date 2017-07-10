/**
 * Created by david on 7/10/17.
 */
import React, { Component } from 'react';


class AuthForm extends Component {
  // this is how we manage state without redux
  // this is component level state (won't e accessible outside of this component?)
  constructor (props) {
    super(props);

    this.state = {email: '', password: ''}
  }

  onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.onSubmit({ email, password });
  }


  render () {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={ event => this.setState({ email: event.target.value })}
            />
          </div>
          <div className="input-field">

            <input
              placeholder="Password"
              type="password"
              value={ this.state.password }
              onChange={ event => this.setState({ password: event.target.value })}
            />
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm
