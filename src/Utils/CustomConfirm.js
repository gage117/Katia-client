import React from 'react';
import ReactDOM from 'react-dom';

const confirmRoot = document.createElement('div');
const body = document.querySelector('body');
body.appendChild(confirmRoot);

const customConfirm = (
  DialogContent, prompt
) => {
  return new Promise(res => {
    const giveAnswer = (answer) => {
      ReactDOM.unmountComponentAtNode(confirmRoot);
      res(answer);
    }

    ReactDOM.render(<DialogContent prompt={prompt} giveAnswer={giveAnswer} />, confirmRoot);
  })
}

export default customConfirm;