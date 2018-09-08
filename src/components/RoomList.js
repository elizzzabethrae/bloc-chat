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

  handleChange(e) {
    const newState = {
      newRoom: e.target.value
    }
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.newRoom) { return }
    const newRoomName = { name: this.state.newRoom };
    this.setState({ rooms: [...this.state.rooms, newRoomName], newRoom: '' });
    this.roomsRef.push({
    name: newRoomName
   });
  }

    componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
        this.setState({ rooms: this.state.rooms.concat( room ) })
      });
    }

    render() {
      return (
        <section className = "App">
          <section className = 'newRoom'>
           {this.state.rooms.map( (room) =>
              <div key={room.key}> {this.state.rooms.name} </div>)}
          </section>
          <form key={this.handleSubmit} onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" value= {  this.state.newRoom } onChange={ (e) => this.handleChange(e) } />
            <input type="submit" />
          </form>
        </section>
      );
    };
}

export default RoomList;
