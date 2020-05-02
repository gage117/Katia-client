import config from '../config';
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
};

export default MatchesService;