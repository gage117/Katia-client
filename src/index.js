import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { UserProvider } from './Contexts/UserContext';
import { ThemeProvider } from './Contexts/ThemeContext';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
