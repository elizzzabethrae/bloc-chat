import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''

    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleSubmit (newMessage) {
    if (!this.state.newMessage) { return }
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      user: this.props.user ? this.props.user.displayName : "Guest",
    });
    this.setState ({newMessage:''});
  }


  handleChange (e) {
    this.setState({newMessage: e.target.value});
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      const messages = this.state.messages.concat(message);
//sort here
     this.setState({ messages })
    });
  }

  formatTime(time) {
    let date = new Date (time);
    return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
  }

  deleteMessage (message) {
       let filteredMessages = this.state.messages.filter( function( message, key)  {
         if ( message.key === this.message.key) { // this is what we want to delete
           return false;
         }
         // If it's not what we want to delete, keep it!
         else return true;
       })
      this.setState({messages : filteredMessages});
  }


  render(){
    return (
      <section className = "messageList">
      <p>Chat Room: {this.props.activeRoom.name}</p>
        <section className = 'messages'>
         {this.state.messages.map( (message, index) =>
           this.props.activeRoom.key === message.roomId && (
              <div key={message.key}>
                 <div>User: {message.user}</div>
                 <div>Message: {message.content} </div>
                 <div>Time Stamp: { this.formatTime(message.sentAt) }</div>
                 <input type="button" value="Delete" onClick={() => this.deleteMessage(message)} />
                 <br></br>
                 <br></br>
               </div>
            ))}

        </section>

      <section className = "Form">
          <form onSubmit={ (e) => { e.preventDefault(); this.handleSubmit(this.state.newMessage) } }>
            <input type="text" placeholder="Write a Message" value= {  this.state.newMessage } onChange={ (e) => this.handleChange(e) } />
            <input type="submit" />
          </form>
      </section>
      </section>
    );
  }

}

export default MessageList;
