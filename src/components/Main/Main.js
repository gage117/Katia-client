import React from 'react'
import './Main.css'
import UserContext from '../../Contexts/UserContext'
import SwipeService from '../../services/swipe-service'
import { Link } from 'react-router-dom'
import userSVG from '../../images/user.svg'
import contactsSVG from '../../images/contacts.svg'
import nintendoNetworkLogo from '../../images/nintendo_logo.png'
import playstationLogo from '../../images/Playstation_logo_colour.svg'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import xboxLogo from '../../images/Xbox_one_logo.svg'
import checkmarkSVG from '../../images/checkmark-circle-2.svg'
import x_markSVG from '../../images/x-circle.svg'
import down_caretSVG from '../../images/solid_caret-down.svg'


export default class MainPage extends React.Component {
    state = {
        potentialMatches: [],
        error: null
    }

    static contextType = UserContext;

    componentDidMount() {
        SwipeService.getPotentialMatches(this.context.user.id)
            .then(potentialMatches => {
                this.setState({ potentialMatches })
            })
    }

    render() {
        const userOne = this.state.potentialMatches[0] || {}
        return (
            <section className='main__Swipe'>
                <div className='main__Nav'>
                    <Link to='/profile'>
                        <img className='main__profile-button' src={userSVG} alt='profile' />
                    </Link>
                    <Link to='/matches'>
                        <img className='main__contacts-button' src={contactsSVG} alt='contacts' />
                    </Link>
                </div>
                {<li className='main__Swipe-User'>
                    <img src={userOne.avatar} alt='avatar' className='main__Image' />
                    <h3>{userOne.display_name}</h3>
                    <h4>Platforms</h4>
                    <span>
                        {/*userOne.platforms*/}
                        <img className='main__xbox' src={xboxLogo} alt='Xbox logo' />
                        <img className='main__playstation' src={playstationLogo} alt='Playstation logo' />
                        <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' />
                        <img className='main__PC' src={PC_Logo} alt='PC logo' />
                    </span>
                    <h4>LFM In</h4>
                    <span>{userOne.lfm_in}</span>
                    <img className='main__down-caret' src={down_caretSVG} alt='down-caret' />
                </li>}
                <div className='main__Second-Nav'>
                    <img className='main__x' src={x_markSVG} alt='x' />
                    <img className='main__check' src={checkmarkSVG} alt='checkmark'/>
                </div>
            </section>
        )
    }
}