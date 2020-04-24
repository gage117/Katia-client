import React from 'react'
import './Matches.css'
import users from '../../store'
import UserContext from '../../Contexts/UserContext'
import {Link } from 'react-router-dom'
import cardsIcon from '../../images/cards.png'
import nintendoNetworkLogo from '../../images/nintendo_logo.png'
import playstationLogo from '../../images/Playstation_logo_colour.svg'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import xboxLogo from '../../images/Xbox_one_logo.svg'


export default class Matches extends React.Component {
    static contextType = UserContext;

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
                <section className='match__info hidden'>
                <h4 className='match__card-header'>Platforms</h4>
                    <div className='main__platforms'>
                        {user.platforms.includes("Xbox") ? <img className='main__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {user.platforms.includes("PlayStation") ? <img className='main__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {user.platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' /> : null}
                        {user.platforms.includes("PC") ? <img className='main__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>
                    <h4 className='match__card-header'>LFM In</h4>

                    {/*{this.generateLfmElements(user.lfm_in)}*/}
                    <p>{user.lfm_in}</p>

                    <h4 className='match__card-header'>Genres</h4>
                    <span>{this.context.generateGenreString(user.genres)}</span>
                    <><h4 className='match__card-header'>Bio</h4>
                    <p className='match__bio'>{user.bio}</p></>
                </section>
                </li>)}
            </ul>
            </>
        )
    }
}