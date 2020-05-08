import React from 'react'
import './Matches.css'
import UserContext from '../../Contexts/UserContext'
import { Link } from 'react-router-dom'
// import cards_icon from '../../images/cards.png'
import nintendoLogo from '../../images/nintendo_logo.png'
import playstationLogo from '../../images/playstation_color_png.png'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import xboxLogo from '../../images/xbox_logo_png.png'
// import mail_icon from '../../images/mail.svg'
import MatchesService from '../../services/matches-service'
import backArrow from '../../images/left-arrow-svgrepo-com.svg'
import chatBlack from '../../images/chatblack.svg'
// import singleChat from '../../images/singleChat.svg'
// import singleChatTwo from '../../images/singleChatTwo.svg'

export default class Matches extends React.Component {
    state = {
        users: [],
        error: null
    }

    static contextType = UserContext;

    state = {
      users: []
    }

    componentDidMount(){

        MatchesService.getMatchedUsers(this.context.user_id)
        .then(res => this.setState({ users: res}))
        .catch(error => this.setState({error: error.message}))
    }

    toggleExpanded = (event) => {
        return event.currentTarget.getElementsByClassName('matches__info')[0].classList.toggle('hidden')
    }

    render() {
        let users = this.state.users || []
        const gamerTagPlatforms = ['Xbox', 'PSN', 'Nintendo', 'Steam', 'Discord', 'Other']
        if (users.length === 0) {
            return (
                <div className="lds-roller"><div></div><div></div>
                <div></div><div></div><div></div><div>
                </div><div></div><div></div></div>
            )
        }
        return (
            <>
            <div className='matches__icons-container'>
                <Link to='/swipe' className='matches__Link'>
                    <img className='matches__cards-icon' src={backArrow} alt='swipe-cards-icon' />
                </Link>
            </div>
            <header className='matches__header-container'>
                <div className='headerBorder'></div>
                <h3 className='matches__header'>Matches</h3>
            </header>
            {this.state.users[0] === 'none' ? <p className='noMatchesPara'>You have no matches.</p> : 
            <ul className='matches__ul'>
                {users.map(user => <li key={user.user_id} className='matches__li' onClick={this.toggleExpanded}>
                <div className='matchesStyleDiv'>
                <h4 className='matches__display-name'>{user.display_name}</h4>
                <img src={user.avatar} alt='avatar' className='matches__avatar'></img>
                <Link to={`/chat/${user.user_id}`} className='matches__Link'>
                    <img className='matches__mail-icon' src={chatBlack} alt='chat-icon' />
                </Link>
                </div>
                <section className='matches__info hidden'>

                    <h4 className='matches__card-header hidden1'>Platforms</h4>
                    <div className='matches__platforms'>
                        {user.platforms.includes("Xbox") ? <img className='matches__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {user.platforms.includes("PlayStation") ? <img className='matches__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {user.platforms.includes("Nintendo") ? <img className='matches__nintendo' src={nintendoLogo} alt='Nintendo logo' /> : null}
                        {user.platforms.includes("PC") ? <img className='matches__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>

                    <h4 className='matches__card-header'>LFM In</h4>
                    {this.context.generateLfmElements(user.lfm_in)}

                    <h4 className='matches__card-header'>Genres</h4>
                    <p className='matches__genres'>{this.context.generateGenreString(user.genres)}</p>

                    <h4 className='matches__card-header'>Gamer Tags</h4>
                    {gamerTagPlatforms.map(platform => {
                        // If the user has a gamer tag for that platform display it
                        return user[platform.toLowerCase()] !== '' && <p className='matches__gamer-tags'>{platform + ': ' + user[platform.toLowerCase()]}</p>
                    })}
                    
                    <h4 className='matches__card-header'>Bio</h4>
                    <p className='matches__bio'>{user.bio}</p>
                </section>
                </li>)}
            </ul>}
            </>
        )
    }
}