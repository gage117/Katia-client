import config from '../config';
import TokenService from './token-service';

const MatchesService = {
    // gets all users that we have matched with (i.e. we both "approved" each other)
    getMatchedUsers(userId) {
        return fetch(`${config.API_ENDPOINT}/matched/${userId}`)
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          );
    },
    // removes a specified match for a user
    removeMatch(userId, match_user_id) { 
      return fetch(`${config.API_ENDPOINT}/matched/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${TokenService.getAuthToken()}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({ match_user_id })
      })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
    }
};

export default MatchesService;