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
  state = {
    user_id: -1,
    error: null
  };

  componentDidMount() {
    if(this.state.user_id === -1 && TokenService.hasAuthToken()) {
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
    const account = TokenService.getUserFromToken(TokenService.getAuthToken())
    this.setState({ user_id: account.id })
  }

  generateLfmElements = (games) => {
      return games.map(game => {
          return (<p className='lfm-in' key={game}>{game}</p>)
      })
  }

  generateGenreString = (genres) => {
    try {
        let genreString = '';
        if (genres.length === 0) {
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
    catch {
        return ''
    }
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
      generateGenreString: this.generateGenreString
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}