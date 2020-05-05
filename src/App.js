import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './routes/MainPage/MainPage'
import LandingRoute from './routes/LandingRoute/LandingRoute'
import SignupPage from './routes/SignupPage/SignupPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'
import LoginPage from './routes/LoginPage/LoginPage'
import Profile from './components/Profile/Profile';
import Matches from './components/Matches/Matches';
import MessagePage from './routes/MessagePage/MessagePage';

import PrivateRoute from './Utils/PrivateRoute';
import PublicOnlyRoute from './Utils/PublicOnlyRoute';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       error: null
    }
  }
  
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path='/'
            component={LandingRoute}
          />
          <PublicOnlyRoute 
            exact
            path='/login'
            component={LoginPage}
          />
          <PublicOnlyRoute
            exact
            path='/signup'
            component={SignupPage}
          />
          <PrivateRoute
            exact
            path='/swipe'
            component={MainPage}
          />
          <PrivateRoute
            exact
            path='/profile'
            component={Profile}
          />
          <PrivateRoute
            exact 
            path='/matches'
            component={Matches}
          />
          <PrivateRoute
            exact
            path='/chat/:chatPartner'
            component={MessagePage}
          />
          <Route
            component={NotFoundPage}
          />
        </Switch>
      </div>
    );  
  }
}

export default App;
