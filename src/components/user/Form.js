import React, { Component } from 'react';
import firebase from '../../api/firebase';

class LoginForm extends Component {
  state = {
    register: false,
    user: {
      email: '',
      password: '',
    },
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { email } = this.state.user;
    const { password } = this.state.user;

    if (this.state.register) {
      // register user
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then( response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      firebase.auth()
      .signInWithEmailAndPassword( email, password )
      .then( response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }

   
  };

  onChangeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState( prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
    
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.onChangeHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            { this.state.register ? 'Register' : 'Login'}
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
