import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.roomsRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
     this.setState({ messages: this.state.messages.concat( message ) }) //is this right? YES
    });
  }


  render(){
    return (
      <section className = "messageList">
        <section className = 'messages'>
         {this.state.messages.map( (message) =>
           this.props.activeRoom == message.roomId && (
            <div key={message.key}> {message.content} </div>))}; // or maybe message.value as well as username
        </section>
      </section>
      //include adding new massages here with an onchange thing
    );
  }

}

export default MessageList;
