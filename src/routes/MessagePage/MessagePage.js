import React, { Component } from 'react';
import UserContext from '../../Contexts/UserContext';
import ProfileService from '../../services/profile-service';
import socket from '../../socket';

import Chat from '../../components/Chat/Chat';

class MessagePage extends Component {
  state = { 
    messages: [],
    user: null,
    partner: null
  }

  static contextType = UserContext;

  componentDidMount = () => {
    const { chatPartner } = this.props.match.params;
    socket.emit('newUser', this.context.user_id);
    socket.emit('chatOpen', { 
      userId: this.context.user_id,
      receiverId: chatPartner
    });
    this.handleSocketListeners(this.context.user_id, chatPartner);
    this.setUsers()
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

  setUsers = async () => {
    const user = await ProfileService.getProfile(this.context.user_id);
    const partner = await ProfileService.getProfile(this.props.match.params.chatPartner);
    this.setState({user, partner})
  }

  render() {
    if (this.state.user && this.state.partner) {
      return ( 
        <Chat onSend={this.handleSubmitMessage} user={this.state.user} partner={this.state.partner} messages={this.state.messages} user_id={this.context.user_id} />
      );
    } else {
      return (
        <main className='chat__loading-container'>
          <p className='chat__loading'>Chat Loading...</p>
        </main>
      )
    }
  }
}
 
export default MessagePage;