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
    this.setUser({})
  }

  processLogin = (token) => {
    TokenService.saveAuthToken(token);
    const account = TokenService.getUserFromToken(TokenService.getAuthToken());
    ProfileService.getProfile(account.id)
      .then(info => {
        this.setState({
          user: info
        });
      });
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
      processLogin: this.processLogin
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}