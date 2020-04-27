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

import Queue from '../../Utils/Queue';


export default class MainPage extends React.Component {
    state = {
        queue: null,
        expanded: false,
        error: null
    }

    static contextType = UserContext;

    componentDidMount() {
        SwipeService.getPotentialMatches(this.context.user_id)
            .then(potentialMatches => {
                const queue = new Queue();
                potentialMatches.queue.forEach(match => {
                    queue.enqueue(match);
                });
                this.setState({ queue });
            })
            .catch(error => this.setState({error}));
    }

    toggleExpanded = () => {
        this.setState({ expanded: this.state.expanded ? false : true })
    }

    swipeLeft = () => {
        const { queue } = this.state;
        queue.enqueue(queue.dequeue());

        this.setState({ queue });
    }

    swipeRight = () => {
        const { queue } = this.state;

        const match = queue.dequeue();

        SwipeService.addMatch(this.context.user.id, match.id)
            .then(() => {
                this.setState({ queue });
            })
            .catch(error => this.setState({error}));
    }

    render() {
        const { queue } = this.state;
        if(queue === null) {
            return (
                <div className='loading'>loading</div>
            )
        }

        const userOne = queue.peek();
        
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
                <li className='main__Swipe-User' onClick={this.toggleExpanded} >
                    {this.state.expanded ? (<></>) : (<img src={userOne.avatar} alt='avatar' className='main__Image' />)}
                    <h3 className='main__display-name'>{userOne.display_name}</h3>
                    <h4 className='main__card-header'>Platforms</h4>
                    <div className='main__platforms'>
                        {userOne.platforms.includes("Xbox") ? <img className='main__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {userOne.platforms.includes("PlayStation") ? <img className='main__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {userOne.platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' /> : null}
                        {userOne.platforms.includes("PC") ? <img className='main__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>
                    <h4 className='main__card-header'>LFM In</h4>

                    {/*{this.context.generateLfmElements(userOne.lfm_in)}*/}
                    <p>{userOne.lfm_in}</p>
                    <p>{userOne.lfm_in}</p>
                    <p>{userOne.lfm_in}</p>

                    <h4 className='main__card-header'>Genres</h4>
                    <span>{this.context.generateGenreString(userOne.genres)}</span>
                    {this.state.expanded ? (<><h4 className='main__card-header'>Bio</h4>
                    <p className='main__bio'>{userOne.bio}</p></>)
                    :
                    (<></>)}
                    <div className='main__caret-container'>
                        <input className={`main__down-caret${this.state.expanded ? ' reverse' : ''}`} type="image" src={down_caretSVG} alt='down-caret' />
                    </div>
                </li>
                <div className='main__Second-Nav'>
                    <img className='main__x' src={x_markSVG} alt='x' onClick={this.swipeLeft} />
                    <img className='main__check' src={checkmarkSVG} alt='checkmark' onClick={this.swipeRight} />
                </div>
            </section>
        )
    }
}