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
    const { user_name, password } = ev.target

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.onLoginSuccess(user_name.value)
        user_name.value = ''
      })
      .catch(res => {
        this.setState({error: res.error})
      })
  }

  render() {
    return (
      <main id='Login__main-flex'>
        <section className='Login__container'>
          <Link to='/'>Project Manhattan</Link>
          <h2>Login</h2>
          <form
            className='Login__form'
            onSubmit={this.handleSubmitJwtAuth}
          >
            <div role='alert'>
              {this.state.error && <p className='Login__error'>Something went wrong, please try again</p>}
            </div>
            <div className='Login__user_name-div'>
              <label htmlFor='Login__user_name'>
                User name
              </label>
              <input
                required
                name='user_name'
                id='Login__user_name'>
              </input>
            </div>
            <div className='Login__password-div'>
              <label htmlFor='Login__password'>
                Password
              </label>
              <input
                required
                name='password'
                type='password'
                id='Login__password'>
              </input>
            </div>
            <div className='Login__submit-button-div'>
              <button className='Login__submit-button' type='submit'>
                Login
              </button>
              <p className='Login__or'>or</p>
              <Link className='Login__signup-link' to='/signup'>sign up</Link>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

