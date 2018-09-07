import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoom: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }


    handleSubmit(e) {
      e.preventDefault();
      this.roomsRef.push({
      name: newRoomName
     });
   }


    render() {
      return (
        <div className = "App">
          <section className = 'listOfRooms'>
            {this.state.rooms.map( (room) =>
            <div> {room.name} </div> )}
          </section>
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text"/> value= {  this.state.newRoomName } />
            <input type="submit" />
          </form>
        </div>
      );
    };
}

export default RoomList;
