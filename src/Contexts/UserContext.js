import React, { Component } from 'react';
import TokenService from '../services/token-service';
import ProfileService from '../services/profile-service';

const nullUser = {
  id: -1,
  avatar: '',
  display_name: '',
  bio: '',
  lfm_in: '',
  genres: [],
  platforms: []
};

const UserContext = React.createContext();

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { user_id: -1, error: null, user: nullUser }

    if(TokenService.hasAuthToken()) {
      const account = TokenService.getUserFromToken(TokenService.getAuthToken())
      this.state.user_id = account.id
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

  processLogin = async (token) => {
    TokenService.saveAuthToken(token)
    const account = TokenService.getUserFromToken(TokenService.getAuthToken())
    const profile = await ProfileService.getProfile(account.id);
    this.setState({ user_id: account.id, user: profile })
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
        return genreString;
  }

  render() {
    const value = {
      user_id: this.state.user_id,
      error: this.state.error,
      user: this.state.user,
      setUser: this.setUser,
      clearUser: this.clearUser,
      setError: this.setError,
      clearError: this.clearError,
      processLogout: this.processLogout,
      processLogin: this.processLogin,
      updateUser: this.updateUser,
      generateLfmElements: this.generateLfmElements,
      generateGenreString: this.generateGenreString,
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}