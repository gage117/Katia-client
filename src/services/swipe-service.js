import config from '../config';
import TokenService from './token-service';

const SwipeService = {
  getPotentialMatches(userId) {
    return fetch(`${config.API_ENDPOINT}/swipe/${userId}`, {
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

  addMatch(userId, id) {
    return fetch(`${config.API_ENDPOINT}/swipe/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
      .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
      );
  },

  addRejection(userId, id) {
    return fetch(`${config.API_ENDPOINT}/swipe/reject/${userId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  },
};

export default SwipeService;