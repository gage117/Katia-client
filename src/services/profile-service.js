import config from '../config';
import TokenService from './token-service';

const ProfileService = {
  getProfile(userId) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}`)
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  getMatches(userId) {
    return fetch(`${config.API_ENDPOINT}/user/${userId}/matches`, {
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
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInfo),
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