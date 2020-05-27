import React, { Component } from 'react';
import TokenService from '../services/token-service';
import io from 'socket.io-client';
import config from '../config';
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
  user_id: -1,
  user: null,
  socket: null,
  error: null,
  vh: 0,
  vw: 0,
  setUser: () => {},
  clearUser: () => {},
  setMatches: () => {},
  clearMatches: () => {},
  setError: () => {},
  clearError: () => {},
  processLogout: () => {},
  processLogin: () => {},
  updateUser: () => {}, // Still works with none of this
  setView: () => {},
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { user_id: -1, user: nullUser, socket: null, error: null, vh: 0, vw: 0 }


    // Start: getView & debounce tracks resizing of window and adds vh & vw to state
    function getView() {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    state.vw = vw
    state.vh = vh
    }

    getView();

  //   const debounce = (func, wait, immediate) => {
  //     let timeout;
  //     return () => {
  //         const context = this, args = arguments;
  //         const later = function() {
  //             timeout = null;
  //             if (!immediate) func.apply(context, args);
  //         };
  //         const callNow = immediate && !timeout;
  //         clearTimeout(timeout);
  //         timeout = setTimeout(later, wait);
  //         if (callNow) func.apply(context, args);
  //     };
  // };
  // window.addEventListener('resize', debounce(() => getView(),
  // 200, true), false);
  // end
  
    if(TokenService.hasAuthToken()) {
      const account = TokenService.getUserFromToken(TokenService.getAuthToken())
      const socket = io(config.SOCKET_CONNECTION)
      state.user_id = account.id
      state.socket = socket.connect()
    }

    this.state = state;
  }

  setView = (vh, vw) => {
    this.setState({ vh: vh, vw: vw })
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
    this.state.socket.disconnect()
    this.setState({ socket: null })
  }

  processLogin = async (token) => {
    TokenService.saveAuthToken(token);
    const account = TokenService.getUserFromToken(TokenService.getAuthToken())
    const profile = await ProfileService.getProfile(account.id);
    const socket = io(config.SOCKET_CONNECTION)
    this.setState({ user_id: account.id, user: profile, socket: socket.connect() })
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
      user: this.state.user,
      socket: this.state.socket,
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
      vh: this.state.vh,
      vw: this.state.vw,
      setView: this.setView
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}