import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './routes/MainPage/MainPage'
import LandingRoute from './routes/LandingRoute/LandingRoute'
import SignupPage from './routes/SignupPage/SignupPage'
import NotFoundPage from './routes/NotFoundPage/NotFoundPage'
import LoginPage from './routes/LoginPage/LoginPage'

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
            path='/swipe'
            component={MainPage}
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
