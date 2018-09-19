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
    this.setState({newRoomName: e.target.value});
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
    });
  }

    render() {

      return (

      <div className='App'>
        <div>
          {this.state.rooms.map( (room) =>
            <section key={room.key} onClick ={() => this.props.setRoom(room)}> {room.name}
            </section>)}
        </div>
      <section className = "Form">
          <form onSubmit={ (e) => { e.preventDefault(); this.handleSubmit(this.state.newRoomName) } }>
            <input type="text" placeholder="Create New Room" value= {  this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
            <input type="submit" />
          </form>
      </section>
    </div>
    );
  }
}

export default RoomList;
