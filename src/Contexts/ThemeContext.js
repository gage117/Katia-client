import React, { Component } from 'react';

const ThemeContext = React.createContext();

export default ThemeContext;

export class ThemeProvider extends Component {
  
  
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