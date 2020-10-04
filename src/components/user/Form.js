import React, { Component } from 'react';
import firebase, { usersCollection } from '../../api/firebase';

class LoginForm extends Component {
  state = {
    register: true,
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
      //  accessing auth methods
      // register user
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then( user => {
        // verify user email
        // response.user.sendEmailVerification()

        // to save user in db
        this.handleStoreRegisterUser(user)
        .then(() => console.log('user registered'))
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

  handleLogout = () => {
    firebase.auth().signOut()
    .then(() => {
      console.log('User logged out!')
    })
  }

  handleGetUserInfo = () => {
    // accessing auth property - currentUser
    let getUser = firebase.auth().currentUser;
    if (getUser) {
      // getUser is - User object in firebase 
      // https://firebase.google.com/docs/reference/js/firebase.User?authuser=0
      // User objects method
      getUser.getIdTokenResult() // token info 
      .then( res => {
        console.log(res)
      })
    } else {
      console.log('No USER')
    }
  }

  // update email
  handleUpdateEmail = ()=> {
    let getUser = firebase.auth().currentUser;
    
    // if (getUser) {
    //   getUser.updateEmail('hi@hello.com')
    //   .then( res => console.log(res))
    // }

    // user re-authentication with Credential
    // auth property, not method
    // updating user credential with EmailAuthProvider in firebase.auth
    let credential = firebase.auth.EmailAuthProvider.credential('hi@hello.com', 'testing1234')
    if (getUser) {
      //reauthenticateWithCredential in User object of firebase.auth
      getUser.reauthenticateWithCredential(credential)
      .then( res => getUser.updateEmail('hello@hi.com'))
    }

  }

  // update user profile behind firebase user dashboard
  handleUpdateProfile = () => {
    let getUser = firebase.auth().currentUser;
    getUser.updateProfile({
      displayName: "Rupak",
      photoURL: "https://whatever.com/photo.jpeg"
    }).then(() => {
      console.log(getUser)
    })
  }

  // register user in db
  handleStoreRegisterUser = (data) => {
    // creating new document with user id
    usersCollection.doc(data.user.uid).set({
      userId: data.user.uid,
      name: data.user.displayName,
      email: data.user.email
    })
    .then( data => console.log(data))
    .catch(e => console.log(e))
  }

  // google sign in
  handleGoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((user) => {
      // store on firestore to save user in db
      this.handleStoreRegisterUser(user)
      console.log(user)
    })
    .catch( e => console.log(e))
  }
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

        <hr />
        <button onClick={this.handleLogout}>Logout</button>
        <hr />
        <button onClick={this.handleGetUserInfo}>Get user info</button>
        <hr />
        <button onClick={this.handleUpdateEmail}>Update user email</button>
        <hr />
        <button onClick={this.handleUpdateProfile}>Update user profile</button>

        <hr />
        <button onClick={this.handleGoogleSignin}>Google Sign in</button>
      </div>
    );
  }
}

export default LoginForm;
