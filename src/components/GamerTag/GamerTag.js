import React from 'react'
import './GamerTag.css'

export default function GamerTag(props) {

    let formattedInput = props.name.charAt(0).toUpperCase() + props.name.slice(1);
    return(
      <>
        <label htmlFor={props.name}>{props.name === 'psn' ? props.name.toUpperCase() : formattedInput}: </label>
        <input 
            type='text'
            name={props.name}
            onChange={e => props.handleChange(e)}
            id={props.name}
            defaultValue={props.defaultVal}
        />
      </>
    )
}