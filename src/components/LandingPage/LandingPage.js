import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'
import AuthService from '../../services/auth-api-service'
import TokenService from '../../services/token-service'

class LandingPage extends Component {
  handleDemoClick = () => { // Only needed if we have a demo account setup
    const demoAccount = {
      "user_name": 'demouser',
      "password": 'password'
    }
    AuthService.postLogin(demoAccount)
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess(demoAccount.user_name)
      })
      .catch(res => {
        console.log({error: res.error})
      })
  }

  render() {
    return (
      <div id='landing-page'>
        <Link to='/login'>Login</Link>
        <h1>Project Manhattan</h1>
        <h2>Find new teammates</h2>
        <h3>who own the platforms you own</h3>
        <h3>and play the games you play</h3>
        <Link to='/signup'>Signup</Link>
      </div>
    )
  }
}

export default LandingPage
