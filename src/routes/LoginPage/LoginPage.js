import React, { Component } from 'react'
import Login from '../../components/Login/Login'
import UserContext from '../../Contexts/UserContext'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  static contextType = UserContext;

  handleLoginSuccess = token => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || `/swipe`

    this.context.processLogin(token);

    history.push(destination)
  }

  render() {
    return (
      <React.Fragment>
        <Login
          onLoginSuccess={this.handleLoginSuccess}
        />
      </React.Fragment>
    )
  }
}
