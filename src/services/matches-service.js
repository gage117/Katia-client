import config from '../config';
import TokenService from './token-service'

const MatchesService = {
    // gets all users that we have matched with (i.e. we both "approved" each other)
    getMatchedUsers(userId) {
        return fetch(`${config.API_ENDPOINT}/matched/${userId}`, {
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

export default MatchesService;