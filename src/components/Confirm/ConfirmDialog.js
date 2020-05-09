import React from 'react';
import './ConfirmDialog.css';

function ConfirmDialog({ prompt, giveAnswer }) {
  return (
    <div className='back-drop fade-in'>
      <div className='ConfirmDialog fade-in'>
        {prompt ? <h1 className='ConfirmDialog__prompt'>{prompt}</h1> : null}
        <h2 className='ConfirmDialog__question'>Are you sure?</h2>
        <div className='ConfirmDialog__controls'>
          <button className='blue-button' onClick={() => giveAnswer(true)}>Yes</button>
          <button className='blue-button' onClick={() => giveAnswer(false)}>No</button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmDialog;