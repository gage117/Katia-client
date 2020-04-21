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
      <main id='lp_main-flex'>
        <Link to='/login' className='lp_login lp_button'>Login</Link>
        <div id='Landing_Page__container'>
          <h1 className='lp_header'>Project Manhattan</h1>
          <hr />
          <h2 className='lp_header'>Find new teammates</h2>
          <h4 className='lp_header'>who own the platforms you own</h4>
          <h4 className='lp_header lp_last-header'>and play the games you play</h4>
          <Link to='/signup' className='lp_signup lp_button'>Signup</Link>
        </div>
      </main>
    )
  }
}

export default LandingPage
