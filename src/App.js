import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


<script src="https://www.gstatic.com/firebasejs/5.4.2/firebase.js"> </script>

  // Initialize Firebase
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Welcome to Bloc Chat!</h1>
        </header>
        <p className="RoomList">
          Here are the available rooms:

        </p>
        <section className='rooms'>
        {
        this.state.rooms.map( (room, index) =>
      //  <Link to ={'./components/RoomList.js'} key ={index}>
            <div> {RoomList.value} </div>
      //   </Link>

          )
        }
        </section>
        </div>
      )
}}


export default App;
