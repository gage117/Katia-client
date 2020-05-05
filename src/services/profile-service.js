import config from '../config';
import TokenService from './token-service';

const ProfileService = {
  getProfile(userId) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  updateProfile(userId, userInfo) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },

  getAllUserGenres() {
    return fetch(`${config.API_ENDPOINT}/user/genres/all`, {
      method: 'GET',
      headers: {
        'Authorization': `${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json'
      },
    })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
      )
  },
  
  uploadAvatar(userId, formData) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: formData
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    );
  }
};

export default ProfileService;