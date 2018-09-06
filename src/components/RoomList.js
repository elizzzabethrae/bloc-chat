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

    handleChange(e) {
      const newState = {
        newRoom: e.target.value
      }
      this.setState(newState)
    }

    handleSubmit(e) {
      e.preventDefault();
      if (!this.state.newRoom) {return
      const newRoomName = { name: this.state.newRoom};
      this.setState({ rooms: [...this.state.rooms, newRoomName]});
      this.roomsRef.push({
      name: newRoomName
     });
   }}

    render() {
      return (
        <div className = "App">
          <section className = 'listOfRooms'>
            {this.state.rooms.map( (room) =>
            <div> {room.name} </div> )}
          </section>
          <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value={ this.state.newRoom } onChange={ (e) => this.handleChange(e) } />
            <input type="submit" />
          </form>
        </div>
      );
    };
}

export default RoomList;
