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
import ProfileService from './services/profile-service';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       error: null
    }
  }
  
  componentDidMount() {
    ProfileService.getAllUserGenres();
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
          <Route 
            exact
            path='/login'
            component={LoginPage}
          />
          <Route
            exact
            path='/signup'
            component={SignupPage}
          />
          <Route
            exact
            path='/swipe'
            component={MainPage}
          />
          <Route
            exact
            path='/profile'
            component={Profile}
          />
          <Route
            exact 
            path='/matches'
            component={Matches}
          />
          <Route
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
