import React from 'react'
import './Matches.css'
import users from '../../store'
import {Link } from 'react-router-dom'
import cardsIcon from '../../images/cards.png'
// import nintendoNetworkLogo from '../../images/nintendo_logo.png'
// import playstationLogo from '../../images/Playstation_logo_colour.svg'
// import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
// import xboxLogo from '../../images/Xbox_one_logo.svg'


export default class Matches extends React.Component {

    render() {
        return (
            <>
            <div className='matches__icons-container'>
                <Link to='/swipe' className='matches__Link'>
                    <img className='matches__cards-icon' src={cardsIcon} alt='swipe-cards-icon' />
                </Link>
            </div>
            <header className='matches__header-container'>
                <h3 className='matches__header'>Matches</h3>
            </header>
            <ul className='matches__ul'>
                {users.map(user => <li key={user.user_id} className='match__li'>
                <h4 className='match__display-name'>{user.display_name}</h4>
                <img src={user.avatar} alt='avatar' className='match__avatar'></img>
                </li>)}
            </ul>
            </>
        )
    }
}