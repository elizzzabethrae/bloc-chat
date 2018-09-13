import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
      //highlight active room
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
        <section className = "App">
          <table>
          <thead>
            <tr>
              <th> List of Rooms </th>
            </tr>
          </thead>
          <tbody>
          {this.state.rooms.map( (room) =>
            <tr key={room.key}>
               <td>
                onClick = { () => this.props.setRoom(room)}
                {room.name}
               </td>
            </tr>
            )}
          </tbody>
        </table>
      </section>
      <section>
          <form onSubmit={ (e) => { e.preventDefault(); this.handleSubmit(this.state.newRoomName) } }>
            <input type="text" value= {  this.state.newRoomName } onChange={ (e) => this.handleChange(e) } />
            <input type="submit" />
          </form>
      </section>
      )
     ;
    }
  ;
}

export default RoomList;
