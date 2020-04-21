import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './routes/MainPage/MainPage'
import LandingRoute from './routes/LandingRoute/LandingRoute'
import SignupPage from './routes/SignupPage/SignupPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'
import LoginPage from './routes/LoginPage/LoginPage'
import Profile from './components/Profile/Profile';
import Matches from './components/Matches/Matches';

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
            component={NotFoundPage}
          />
        </Switch>
      </div>
    );  
  }
}

export default App;
