import React from 'react';
import ReactDOM from 'react-dom';

const confirmRoot = document.createElement('div');
const body = document.querySelector('body');
body.appendChild(confirmRoot);

const customConfirm = (
  DialogContent
) => {
  return new Promise(res => {
    const giveAnswer = (answer) => {
      ReactDOM.unmountComponentAtNode(confirmRoot);
      res(answer);
    }

    ReactDOM.render(<DialogContent giveAnswer={giveAnswer} />, confirmRoot);
  })
}

export default customConfirm;