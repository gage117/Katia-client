import React from 'react'
import './Matches.css'
import UserContext from '../../Contexts/UserContext'
import { Link } from 'react-router-dom'
import cardsIcon from '../../images/cards.png'
import nintendoLogo from '../../images/nintendo_logo.png'
import playstationLogo from '../../images/playstation_color_png.png'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import xboxLogo from '../../images/xbox_logo_png.png'
import MatchesService from '../../services/matches-service'

export default class Matches extends React.Component {
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
        return event.currentTarget.getElementsByClassName('match__info')[0].classList.toggle('hidden')
    }

    render() {
        let users = this.state.users || []
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
                {users.map(user => <li key={user.user_id} className='match__li' onClick={this.toggleExpanded}>
                <h4 className='match__display-name'>{user.display_name}</h4>
                <img src={user.avatar} alt='avatar' className='match__avatar'></img>
                <section className='match__info hidden'>
                    <h4 className='match__card-header'>Platforms</h4>
                    <div className='match__platforms'>
                        {user.platforms.includes("Xbox") ? <img className='match__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {user.platforms.includes("PlayStation") ? <img className='match__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {user.platforms.includes("Nintendo") ? <img className='match__nintendo' src={nintendoLogo} alt='Nintendo logo' /> : null}
                        {user.platforms.includes("PC") ? <img className='match__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>
                    <h4 className='match__card-header'>LFM In</h4>

                    {this.context.generateLfmElements(user.lfm_in)}

                    <h4 className='match__card-header'>Genres</h4>
                    <p className='match__genres'>{this.context.generateGenreString(user.genres)}</p>
                    <><h4 className='match__card-header'>Bio</h4>
                    <p className='match__bio'>{user.bio}</p></>
                </section>
                </li>)}
            </ul>
            </>
        )
    }
}