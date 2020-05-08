import React from 'react';
import './ConfirmDialog.css';

function ConfirmDialog({ giveAnswer }) {
  return (
    <div className='back-drop fade-in'>
      <div className='ConfirmDialog fade-in'>
        <h1 className='ConfirmDialog__text'>Are you sure?</h1>
        <div className='ConfirmDialog__controls'>
          <button className='blue-button' onClick={() => giveAnswer(true)}>Yes</button>
          <button className='blue-button' onClick={() => giveAnswer(false)}>No</button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmDialog;