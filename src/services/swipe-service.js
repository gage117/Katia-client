import config from '../config';
import TokenService from './token-service';

const SwipeService = {
  getPotentialMatches(userId) {
    console.table(`${TokenService.saveAuthToken}`);
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
};

export default SwipeService;