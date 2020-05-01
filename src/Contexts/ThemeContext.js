import React, { Component } from 'react';

const ThemeContext = React.createContext();

export default ThemeContext;

export class ThemeProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  
  render() {
    const value = {

    }

    return (
      <ThemeContext.Provider value={value}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}