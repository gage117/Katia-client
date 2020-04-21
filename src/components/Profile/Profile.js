import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import users from '../../store'

export default class Profile extends React.Component {
    render() {
        const currentUser = users[2] || {}
        return (
            <>
            <h3 className='profileH3'>My Profile</h3>
            <Link to='/swipe' className='profileLink'>Main</Link>
            {<div className='editDiv'> 
            <img src={currentUser.avatar} alt='avatar' className='profileImg'></img>
            <h4>Username: {currentUser.display_name}</h4>
            <p>Bio: {currentUser.bio}</p>
            <span> Platforms: {currentUser.platforms}</span>
            <span> lfm in: {currentUser.lfm_in}</span>
            </div>}
            </>
        )
    }
}