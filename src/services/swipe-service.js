import config from '../config';
import TokenService from './token-service';

const SwipeService = {
  getPotentialMatches(userId) {
    return fetch(`${config.API_ENDPOINT}/swipe/${userId}`)
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
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
      .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
      );
  }
};

export default SwipeService;