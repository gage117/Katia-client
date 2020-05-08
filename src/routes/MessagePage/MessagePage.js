import React, { Component } from 'react';
import UserContext from '../../Contexts/UserContext';
import ProfileService from '../../services/profile-service';
import Chat from '../../components/Chat/Chat';

class MessagePage extends Component {
  state = { 
    messages: [],
    conversation_id: -1,
    user: null,
    partner: null
  }

  static contextType = UserContext;

  componentDidMount() {
    const { socket, user_id } = this.context;
    const { chatPartner } = this.props.match.params;
    if (socket) {
      socket.emit('newUser', user_id);
      socket.emit('chatOpen', { 
        userId: user_id,
        receiverId: chatPartner
      })
    };
    this.handleSocketListeners(this.context.user_id, chatPartner);
    this.setUsers()
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
    if (socket) {
      socket
        .on('conversationId', conversation_id => {
          this.setState({ conversation_id });
        })
        .on('priorMessages', messages => {
          this.setState({ messages })
        })
        .on('incomingMessage', message => {
          if(message.conversation_id === this.state.conversation_id) {
            let { messages } = this.state
            messages.push(message)
            this.setState({ messages })
          }
        });
    }
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
        <div className="lds-roller"><div></div><div></div>
        <div></div><div></div><div></div><div>
        </div><div></div><div></div></div>
      )
    }
  }
}
 
export default MessagePage;