import React from 'react'
import './GamerTag.css'

export default function GamerTag(props) {

    let formattedInput = props.name.charAt(0).toUpperCase() + props.name.slice(1);
    return(
      <div className='gamer-tag__container'>
        <label 
          htmlFor={props.name}
          className='gamer-tag__label'>
            {props.name === 'psn' ? props.name.toUpperCase() : formattedInput}: </label>
        <input 
            type='text'
            className='gamer-tag__input'
            name={props.name}
            onChange={e => props.handleChange(e)}
            id={props.name}
            defaultValue={props.defaultVal}
        />
      </div>
    )
}