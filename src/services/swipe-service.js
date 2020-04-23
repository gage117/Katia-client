import config from '../config';

const SwipeService = {
  getPotentialMatches(userId) {
    return fetch(`${config.API_ENDPOINT}/swipe/${userId}`)
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },
};

export default SwipeService;