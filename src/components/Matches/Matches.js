import React from 'react'
import './Matches.css'
import users from '../../store'
import {Link } from 'react-router-dom'

export default class Matches extends React.Component {

    render() {
        return (
            <>
            <h3 className='matchH3'>Matches</h3>
            <Link to='/swipe' className=''>Main</Link>
            <ul className='matchUl'>
                {users.map(user => <li key={user.user_id}>
                <img src={user.avatar} alt='avatar' className='matchImg'></img>
                <h4>{user.display_name}</h4>
                </li>)}
            </ul>
            </>
        )
    }
}