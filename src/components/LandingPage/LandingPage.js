import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'

class LandingPage extends Component {
  render() {
    return (
      <main id='lp__main-flex'>
        <Link to='/login' className='lp__login lp__button'>Login</Link>
        <div id='lp__container'>
          <h1 className='lp__logoContainer'>
          <Link to='/' className='lp__lp-link'>Katia</Link>
          </h1>
          <div className='separator'></div>
          <h2 className='lp__header'>Find new teammates. Squad up.</h2>
          <p className='lp__about-para'>Katia is a social media application made for gamers by gamers. Quickly and easily find others who share the same games and platforms as you.</p>
          <Link to='/signup' className='lp__button lp__button-margin'>Signup</Link>
        </div>
      </main>
    )
  }
}

export default LandingPage
