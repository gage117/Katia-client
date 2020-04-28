import React, { Component } from 'react';
import TokenService from '../services/token-service';

const nullUser = {
  id: -1,
  avatar: '',
  display_name: '',
  bio: '',
  lfm_in: '',
  genres: [],
  platforms: []
};

const UserContext = React.createContext({
  user: nullUser,
  matches: [],
  error: null,
  setUser: () => {},
  clearUser: () => {},
  setMatches: () => {},
  clearMatches: () => {},
  setError: () => {},
  clearError: () => {},
  processLogout: () => {},
  updateUser: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  state = {
    user: nullUser,
    error: null
  };

  componentDidMount() {
    if(this.state.user === nullUser && TokenService.hasAuthToken()) {
        this.processLogin(TokenService.getAuthToken());
    }
  }

  setUser = user => {
    this.setState({ user });
  }

  updateUser = user => {
    this.setState({ ...this.state.user, ...user })
  }

  clearUser = () => {
    this.setState({ user: nullUser });
  }

  setError = error => {
    this.setState({ error });
  }

  clearError = () => {
    this.setState({ error: null });
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    this.setUser(nullUser)
  }

  processLogin = (token) => {
    TokenService.saveAuthToken(token)
    const user = TokenService.getUserFromToken(TokenService.getAuthToken())
    this.setUser(user);
  }

  generateLfmElements = (games) => {
    try { // try to split the games string at the commas and create JSX for each
      const splitString = games.split(',')
      return splitString.map(game => {
        let gameName = game
        while (gameName[0] === ' ') { // Removes any spaces at the beginning of the name
          gameName = gameName.slice(1)
        }
        while (gameName[gameName.length - 1] === ' ') { // Removes any spaces at the end of the name
          gameName = gameName.slice(gameName.length - 1)
        }
        return (<p className='lfm-in' key={gameName}>{gameName}</p>)
      })
    }
    catch { // return nothing to populate element if user's lfm_in undefined
      return null
    }
  }

  generateGenreString = (genres) => {
    let genreString = '';
        if (genres === undefined || genres.length === 0) {
            genreString = 'No Genres Chosen'
        } else if (genres.length === 1) {
            genreString = genres[0]
        } else {
            for (let i = 0; i < genres.length; i++) {
                if (i < genres.length - 1) {
                    genreString += `${genres[i]}, `
                } else if (i === genres.length - 1) {
                    genreString += `${genres[i]}`
                }
            }
        }
        return genreString
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setUser: this.setUser,
      clearUser: this.clearUser,
      setError: this.setError,
      clearError: this.clearError,
      processLogout: this.processLogout,
      processLogin: this.processLogin,
      updateUser: this.updateUser,
      generateLfmElements: this.generateLfmElements,
      generateGenreString: this.generateGenreString
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}