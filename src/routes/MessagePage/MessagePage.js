import React, { Component } from 'react';
import UserContext from '../../Contexts/UserContext';

import Chat from '../../components/Chat/Chat';

class MessagePage extends Component {
  state = { 
    messages: []
  }

  static contextType = UserContext;

  componentDidMount() {
    const { socket, user_id } = this.context;
    const { chatPartner } = this.props.match.params;
    socket.emit('newUser', user_id);
    socket.emit('chatOpen', { 
      userId: user_id,
      receiverId: chatPartner
    });
    this.handleSocketListeners();
  }

  handleSubmitMessage = (text) => {
    const { socket, user_id } = this.context;
    const { chatPartner } = this.props.match.params;
    socket.emit('message', { 
      text, 
      sender_id: user_id, 
      receiver_id:  chatPartner
    });
  }

  handleSocketListeners = () => {
    const { socket } = this.context;
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