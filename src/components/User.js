import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
   }


  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut() {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render () {
    return(
      <section className="UserAuth">
        <button className="sign-in" value="sign-in" onClick={() =>this.handleSignIn()}>Sign In</button>
        <button className="sign-out" value="sign-out" onClick={() =>this.handleSignOut()}>Sign out</button>
        <p>Current user: {this.props.user ? this.props.user.displayName : "Guest"} </p>
      </section>
    );
  }

}

export default User;
