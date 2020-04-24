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
      user: this.state.user,
      error: this.state.error,
      setUser: this.setUser,
      clearUser: this.clearUser,
      setError: this.setError,
      clearError: this.clearError,
      processLogout: this.processLogout,
      processLogin: this.processLogin,
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