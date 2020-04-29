import React, { Component } from 'react';
import TokenService from '../services/token-service';

const nullUser = {
  id: -1,
  avatar: '',
  display_name: '',
  bio: '',
  lfm_in: '',
  genres: [],
  platforms: ''
};

const UserContext = React.createContext({
  user_id: -1,
  error: null,
  setUser: () => {},
  clearUser: () => {},
  setMatches: () => {},
  clearMatches: () => {},
  setError: () => {},
  clearError: () => {},
  processLogout: () => {},
  processLogin: () => {},
  updateUser: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { user_id: -1, error: null }

    if(state.user_id === -1 && TokenService.hasAuthToken()) {
      TokenService.saveAuthToken(TokenService.getAuthToken())
      const account = TokenService.getUserFromToken(TokenService.getAuthToken())
      state.user_id = account.id
    }

    this.state = state
  }

  // state = {
  //   user_id: -1,
  //   error: null
  // };

  // componentWillMount() {
  //   if(this.state.user_id === -1 && TokenService.hasAuthToken()) {
  //     this.processLogin(TokenService.getAuthToken());
  // }
  // }

  // componentDidMount() {
  //   if(this.state.user_id === -1 && TokenService.hasAuthToken()) {
  //       this.processLogin(TokenService.getAuthToken());
  //   }
  // }

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
    const account = TokenService.getUserFromToken(TokenService.getAuthToken())
    this.setState({ user_id: account.id })
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
      user_id: this.state.user_id,
      error: this.state.error,
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