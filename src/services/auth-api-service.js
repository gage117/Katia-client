import config from '../config'
import TokenService from './token-service'

const AuthApiService = {
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':')
  },
  postLogin(credentials) {
    return fetch(`${config.API_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e=> Promise.reject(e))
          : res.json()
      )
  },
  getUser(user_name) {
    return fetch(`${config.API_ENDPOINT}/user/${user_name}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  updateUser(user) {
    return fetch(`${config.API_ENDPOINT}/user/${user.user_name}`, {
      method: 'PATCH',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...user
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  addUser(user) {
    return fetch(`${config.API_ENDPOINT}/user/${user.user_name}`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...user
      })
    })
      .then(res => (
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      ))
  }
}

export default AuthApiService;