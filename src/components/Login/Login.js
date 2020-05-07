import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AuthApiService from '../../services/auth-api-service'
import './Login.css'

export default class Login extends Component {
  static defaultProps = {
    onLoginSuccess: () => {}
  }

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault()
    this.setState({error: null})
    const { email, password } = ev.target

    AuthApiService.postLogin({
      email: email.value.toLowerCase(),
      password: password.value
    })
      .then(res => {
        email.value = ''
        password.value = ''
        this.props.onLoginSuccess(res.authToken)
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    return (
      <>
      <main id='lp__main-flex'>
        <div className='lp__logoContainer'>
        <Link to='/' className='lp__lp-link'>Katia</Link>
        </div>
        <section className='Login__container'>
          <h2 className='Login__header'>Login</h2>
          <form
            className='Login__form'
            onSubmit={this.handleSubmitJwtAuth}
          >
            <div role='alert'>
              {this.state.error && <p className='Login__error'>{this.state.error}</p>}
            </div>
            <div className='Login__email-div lp__input-div'>
              <label className='lp__label' htmlFor='Login__email'>
                Email
              </label>
              <input
                required
                name='email'
                id='Login__email'
                className='lp__input'>
              </input>
            </div>
            <div className='Login__password-div lp__input-div'>
              <label className='lp__label' htmlFor='Login__password'>
                Password
              </label>
              <input
                required
                name='password'
                type='password'
                id='Login__password'
                className='lp__input'>
              </input>
            </div>
            <button className='lp__button lp__button-margin' type='submit'>
                Login
              </button>
            <div className='Login__submit-button-div'>
              <p className='Login__or'>Need an account?</p>
              <Link className='Login__signup-link' to='/signup'>Sign Up</Link>
            </div>
          </form>
        </section>
      </main>
      </>
    )
  }
}

