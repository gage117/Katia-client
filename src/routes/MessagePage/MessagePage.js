import React, { Component } from 'react';
import UserContext from '../../Contexts/UserContext';
import socket from '../../socket';

import Chat from '../../components/Chat/Chat';

class MessagePage extends Component {
  state = { 
    messages: []
  }

  static contextType = UserContext;

  componentDidMount() {
    const { chatPartner } = this.props.match.params;
    socket.emit('newUser', this.context.user_id);
    socket.emit('chatOpen', { 
      userId: this.context.user_id,
      receiverId: chatPartner
    });
    this.handleSocketListeners();
  }

  handleSubmitMessage = (text) => {
    socket.emit('message', { 
      text, 
      sender_id: this.context.user_id, 
      receiver_id:  this.props.match.params.chatPartner
    });
  }

  handleSocketListeners = () => {
    socket
      .on('priorMessages', messages => {
        this.setState({ messages })
      })
      .on('incomingMessage', message => {
        let { messages } = this.state
        messages.push(message)
        this.setState({ messages })
      });
  }

  render() { 
    return ( 
      <Chat onSend={this.handleSubmitMessage} messages={this.state.messages} user_id={this.context.user_id} />
    );
  }
}
 
export default MessagePage;