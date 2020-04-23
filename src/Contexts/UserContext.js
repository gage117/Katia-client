import React, { Component } from 'react';
import TokenService from '../services/token-service';
import ProfileService from '../services/profile-service';

const nullUser = {
  id: -1,
  username: '',
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
    matches: [],
    error: null
  };

  componentDidMount() {
    if(this.state.user === nullUser && TokenService.hasAuthToken()) {
        const account = TokenService.getUserFromToken(TokenService.getAuthToken());
        console.log(account)
        ProfileService.getProfile(account.id)
          .then(info => {
            const user = {
              ...account,
              ...info
            };
            ProfileService.getMatches(account.id)
              .then(matches => {
                this.setState({
                  user,
                  matches
                });
              })
          });
    }
  }

  setUser = user => {
    this.setState({ user });
  }

  clearUser = () => {
    this.setState({ user: nullUser });
  }

  setMatches = matches => {
    this.setState({ matches });
  }

  clearMatches = () => {
    this.setState({ matches: [] })
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

  render() {
    const value = {
      user: this.state.user,
      matches: this.state.matches,
      error: this.state.error,
      setUser: this.setUser,
      clearUser: this.clearUser,
      setMatches: this.setMatches,
      clearMatches: this.clearMatches,
      setError: this.setError,
      clearError: this.clearError,
      processLogout: this.processLogout,
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}