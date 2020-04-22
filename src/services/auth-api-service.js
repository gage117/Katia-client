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
    return fetch(`${config.API_ENDPOINT}/auth/token`, {
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
  getUser(userId) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
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
    return fetch(`${config.API_ENDPOINT}/user/${user.id}`, {
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
  registerUser(user) {
    return fetch(`${config.API_ENDPOINT}/user`, {
      method: 'POST',
      headers: {
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