import React, { Component } from 'react';

class Chat extends Component {

  state = {
    message: ''
  }

  handleSendMessage = (event) => {
    event.preventDefault();
    this.props.onSend(this.state.message);
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  }

  render() {
    const { messages } = this.props;
    return ( 
      <>
      <div>
        <ul>
          {messages.map(message => {
            return <li key={message.id}>{`${message.sender_id}: ${message.message}`}</li>
          })}
        </ul>
      </div>
      <form onSubmit={this.handleSendMessage}>
        <label htmlFor='chat_box'>Type a message</label>
        <input id='chat_box' type='text' onChange={this.handleMessageChange} />
        <button onClick={this.handleSendMessage}>Submit</button>
      </form>
      </>
    );
  }
}
 
export default Chat;