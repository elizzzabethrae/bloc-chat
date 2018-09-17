import React, { Component } from 'react';
//import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

//<script src="https://www.gstatic.com/firebasejs/5.4.2/firebase.js"> </script>
  var config = {
    apiKey: "AIzaSyBENxI3i_nY6-_KHqk51Jbu-2qS5vcPAkI",
    authDomain: "bloc-chat-3b95e.firebaseapp.com",
    databaseURL: "https://bloc-chat-3b95e.firebaseio.com",
    projectId: "bloc-chat-3b95e",
    storageBucket: "bloc-chat-3b95e.appspot.com",
    messagingSenderId: "481406438846"
  };
  firebase.initializeApp(config);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
       activeRoom: " ",
       user: null
    };
  }

  setRoom(room) {
    this.setState({
      activeRoom: room.key
    })
  }

  setUser(user) {
    if(user) {
      this.setState ({
        user: user
      });
    } else {
      this.setState({
        user: null
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Welcome to Bloc Chat!</h1>
        </header>

        <User
          firebase= {firebase}
          setUser = {(user) => this.setUser(user)}
          user = {this.state.user}
          />

        <p className="RoomList">
         Here are our available rooms:
        </p>

      <RoomList
        firebase= {firebase}
        setRoom = {(activeRoom) => this.setRoom(activeRoom)}
       />

       <MessageList
        firebase= {firebase}
        activeRoom={this.state.activeRoom}
        />

      </div>
      );
    }
}


export default App;
