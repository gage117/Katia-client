import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
import AuthService from '../../services/auth-api-service'
import './Signup.css'

export default class Signup extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { email, display_name, password, confirm_password } = ev.target
    const user = {
      email: email.value.toLowerCase(),
      display_name: display_name.value,
      password: password.value
    }

    if(password.value === confirm_password.value) {
    AuthService.registerUser(user)
      .then(() => {
        AuthService.postLogin({
          email: email.value.toLowerCase(),
          password: password.value
        })
          .then(res => {
            email.value = ''
            display_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.onRegistrationSuccess(user.user_name)
          })
          .catch(error => this.setState({error: error.message}))
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    } else if(password.value !== confirm_password.value) {
      this.setState({ error: 'passwords did not match' })
    }
  }

  render() {
    const { error } = this.state
    return (
      <>
      <main id='lp__main-flex'>
        <div className='lp__logoContainer'>
        <Link to='/' className='lp__lp-link'>Katia</Link>
        </div>
        <section className='Signup__container'>
          <h2 className='Signup__header'>Signup</h2>
          <form
            className='Signup__form'
            onSubmit={this.handleSubmit}
          >
            <div role='alert'>
              {error && <p className='Signup__error'>{error}</p>}
            </div>
            <div className='Signup__email-div lp__input-div'>
              <label className='lp__label' htmlFor='Signup__email'>
                Email
              </label>
              <input
                name='email'
                type='email'
                required
                id='Signup__email'
                className='lp__input'>
              </input>
            </div>
            <div className='Signup__display_name-div lp__input-div'>
              <label className='lp__label' htmlFor='Signup__display_name'>
                Display Name
              </label>
              <input
                name='display_name'
                type='text'
                required
                id='Signup__display_name'
                className='lp__input'>
              </input>
            </div>
            <div className='Signup__password-div lp__input-div'>
              <label className='lp__label' htmlFor='Signup__password'>
                Password 
              </label>
              <input
                name='password'
                type='password'
                required
                id='Signup__password'
                className='lp__input'>
              </input>
            </div>
            <div className='Signup__confirm_password-div lp__input-div'>
              <label className='lp__label' htmlFor='Signup__confirm_password'>
                Confirm Password 
              </label>
              <input
                name='confirm_password'
                type='password'
                required
                id='Signup__confirm_password'
                className='lp__input'>
              </input>
            </div>
            <button className='blue-button blue-button-margin' type='submit'>
              Submit
            </button>
            <div className='Signup__submit-button-div'>
              <p className='Signup__or'>Already have an account? </p>
              <Link className='Signup__login-link' to='/login'>Login</Link>
            </div>
          </form>
        </section>
      </main>
      </>
    )
  }
}

