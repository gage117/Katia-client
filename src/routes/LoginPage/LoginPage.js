import React, { Component } from 'react'
import Login from '../../components/Login/Login'

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || `/swipe`
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
