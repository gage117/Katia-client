import React, {Component} from 'react'
import LandingPage from '../../components/LandingPage/LandingPage'

class LandingRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = (user_name) => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || `/user/${user_name}`
    history.push(destination)
  }
  
  render() {
    return (
      <React.Fragment>
        <LandingPage onLoginSuccess={this.handleLoginSuccess}/>
      </React.Fragment>
    )
  }
}

export default LandingRoute
