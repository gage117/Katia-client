import React from 'react'
import './GamerTag.css'

export default function GamerTag(props) {
    return(
      <>
        <label htmlFor={props.name}>{props.name}</label>
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