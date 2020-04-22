import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
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
      email: email.value,
      password: password.value
    })
      .then(res => {
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess()
        email.value = ''
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    return (
      <main id='lp_main-flex'>
        <Link to='/' className='lp_lp-link'>Project Manhattan</Link>
        <section className='Login__container'>
          <h2 className='Login__header'>Login</h2>
          <form
            className='Login__form'
            onSubmit={this.handleSubmitJwtAuth}
          >
            <div role='alert'>
              {this.state.error && <p className='Login__error'>Something went wrong, please try again</p>}
            </div>
            <div className='Login__email-div lp_input-div'>
              <label htmlFor='Login__email'>
                Email
              </label>
              <input
                required
                name='email'
                id='Login__email'
                className='lp_input'>
              </input>
            </div>
            <div className='Login__password-div lp_input-div'>
              <label htmlFor='Login__password'>
                Password
              </label>
              <input
                required
                name='password'
                type='password'
                id='Login__password'
                className='lp_input'>
              </input>
            </div>
            <div className='Login__submit-button-div'>
              <button className='Login__submit-button lp_button' type='submit'>
                Login
              </button>
              <p className='Login__or'>or</p>
              <Link className='Login__signup-link lp_button' to='/signup'>Sign Up</Link>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

