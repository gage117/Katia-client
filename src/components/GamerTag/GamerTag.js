import React from 'react'
import './GamerTag.css'

export default function GamerTag(props) {

    return(<>
        <label htmlFor={props.name}>Platform {props.name}</label>
        <input 
            type='text'
            name={props.name}
            onChange={this.handleDisplayNameChange}
            id={props.name}
            defaultValue={props.defaultVal}
        />
        </>
    );
}