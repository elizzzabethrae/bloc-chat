import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  handleChange(e) {
    const newState = {
      newRoom: e.target.value,
    }
    this.setState(newState);
  }

  handleSubmit(newRoomName) {
      if (!this.state.newRoomName) { return }
      this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.setState({newRoomName: ''});
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
                console.log(this.state.rooms);
    });
  }

    render() {
      return (
        <section   className = "App">
          <section className = 'room'>
           {this.state.rooms.map( (room) =>
              <div key={room.key}> {room.name} </div>)}
          </section>
          <form onSubmit={ this.handleSubmit(this.state.newRoomName) }>
            <input type="text" value= {  this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
            <input type="submit" />
          </form>
        </section>
      );
    };
}

export default RoomList;
