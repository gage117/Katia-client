import React from 'react'
import './Main.css'
import users from '../../store'
import MainPageContext from '../../Contexts/MainPageContext'
import { Link } from 'react-router-dom'


export default class MainPage extends React.Component {
    static contextType = MainPageContext

    componentDidMount() {
        this.context.setUsers(users)
        this.context.setCurrentProfile(users[0])
    }

    render() {
        console.log(this.context.state)
        const userOne = this.context.users[0] || {}
        return (
            <section className='main__Swipe'>
            <div className='main__Nav'>
                <Link to='/profile' className='main__profile-button'>Profile</Link>
                <Link to='/matches' className='main__matches-button'>Matches</Link>
            </div>
            {<li className='main__Swipe-User'>
                <img src={userOne.avatar} alt='avatar' className='main__Image'></img>
                <h3>{userOne.display_name}</h3>
                <h4>Platforms</h4>
                <span>{userOne.platforms}</span>
                {' '}
                <h4>LFM In</h4>
                <span>{userOne.lfm_in}</span>
                <h4>Bio</h4>
                <p>{userOne.bio}</p>
            </li>}
            <div className='main__Second-Nav'>
                <button className='main__no-button'>No</button>
                <button className='main__yes-button'>Yes</button>
            </div>
            </section>
        )
    }
}