import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class SignIn extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.welcomePage || '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    if (this.state.username.length) {
      this.passwordInput.focus();
    } else {
      this.usernameInput.focus();
    }
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.username.length < 1) {
      this.usernameInput.focus();
    }
    if (this.state.username.length > 0 && this.state.password.length < 1) {
      this.passwordInput.focus();
    }
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      var userObj = {
        username: this.state.username,
        password: this.state.password
      };
      fetch('/api/sign_up', {
       method: 'post',
       headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
       },
       body: JSON.stringify(userObj)
     });
      this.setState({ username: '', password: ''});
    }
  }
  render() {
    return (
      <div>
        <header>
          Sign In to Chat
        </header>
        <main>
          <form onSubmit={this.handleSubmit}>
            <input
              label="Username"
              ref={(input) => { this.usernameInput = input; }}
              type="text"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              label="Password"
              ref={(input) => { this.passwordInput = input; }}
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button
              name="submitButton"
              type="submit" >
                <span>Sign In</span>
            </button>
          </form>
        </main>
      </div>
    );
  }
}

export default SignIn
