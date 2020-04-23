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

  // async componentDidMount() {
  //   if(this.state.user === nullUser && TokenService.hasAuthToken()) {
  //     try {
  //       const account = TokenService.getUserFromToken(TokenService.getAuthToken());
  //       const info = await ProfileService.getProfile(account.id);
  //       const matches = await ProfileService.getMatches(account.id);

  //       const user = {
  //         ...account,
  //         ...info,
  //       };

  //       this.setState({
  //         user,
  //         matches
  //       })

  //     } catch(error) {
  //       this.setState({ error });
  //     }
  //   }
  // }

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