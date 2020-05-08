import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../../Contexts/UserContext';
import send_icon from '../../images/send-icon.svg';
import backArrow from '../../images/left-arrow-svgrepo-com.svg'
import './Chat.css';

class Chat extends Component {
  state = {
    message: '',
  }
  
  static contextType = UserContext;

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleSendMessage = (event) => {
    event.preventDefault();
    this.props.onSend(this.state.message);
    this.setState({message: ''})
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  }

  generateUserMessage = (user, message) => {
    return (<li key={message.id} className='chat__message chat__user-message'>
      <span className='chat__message-text chat__user-message-text'>{message.message}</span>
      <img className='chat__avatar chat__user-avatar' src={user.avatar} alt='user-avatar' />
    </li>)
  }

  generatePartnerMessage = (partner, message) => {
    return (<li key={message.id} className='chat__message chat__partner-message'>
      <img className='chat__avatar chat__partner-avatar' src={partner.avatar} alt='partner-avatar' />
      <span className='chat__message-text chat__partner-message-text'>{message.message}</span>
    </li>)
  }

  render() {
    const { messages, user_id, user, partner } = this.props;
    return ( 
      <main className='chat__main'>
        <nav className='chat__nav'>
          <Link to='/matches'>
            <img className='chat__back' src={backArrow} alt='back-arrow' />
          </Link>
          <span className='chat__chatting-with'>{partner.display_name}</span>
        </nav>
        <div className='chatNavBorder'></div>
        <ul className='chat__message-container'>
          {messages.length === 0 ? <li><p>Start the conversation by sending the first message</p></li> : messages.map(message => {
            return message.sender_id === user_id ? this.generateUserMessage(user, message) : this.generatePartnerMessage(partner, message)
          })}
          <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </ul>
        <form onSubmit={this.handleSendMessage} className='chat__message-form' style={{backgroundColor: this.context.backgroundColor}}>
          <textarea className='chat__input' onChange={this.handleMessageChange} onKeyDown={event => {if (event.keyCode === 13) return this.handleSendMessage(event)}} value={this.state.message}/>
          <img className='chat__send' onClick={this.handleSendMessage} src={send_icon} alt='send'/>
        </form>
      </main>
    );
  }
}
 
export default Chat;