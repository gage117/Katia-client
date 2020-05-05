import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'

class LandingPage extends Component {
  render() {
    return (
      <main id='lp_main-flex'>
        <Link to='/login' className='lp_login lp_button'>Login</Link>
        <div id='Landing_Page__container'>
          <h1 className='logoContainer'>
          <Link to='/' className='lp_lp-link signUpKatia landKatia'>Katia</Link>
          </h1>
          <hr />
          <h2 className='lp_header'>Find new teammates. Squad up.</h2>
          <Link to='/signup' className='lp_signup lp_button'>Signup</Link>
          <h3 className='katiaAbout'> About </h3>
    <p className='aboutPara'>Katia is a social media application made for gamers by gamers. <br /> </p>
        </div>
      </main>
    )
  }
}

export default LandingPage
