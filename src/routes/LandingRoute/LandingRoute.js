import React, {Component} from 'react'
import LandingPage from '../../components/LandingPage/LandingPage'

class LandingRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  
  render() {
    return (
      <React.Fragment>
        <LandingPage />
      </React.Fragment>
    )
  }
}

export default LandingRoute
