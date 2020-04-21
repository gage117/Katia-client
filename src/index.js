import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { MainPageProvider } from './Contexts/MainPageContext'

ReactDOM.render(
  <BrowserRouter>
    <MainPageProvider>
      <App />
    </MainPageProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
