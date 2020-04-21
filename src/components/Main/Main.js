import React from 'react'
import './MainPage.css'
import users from '../../store'
import MainPageContext from '../../Contexts/MainPageContext'


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
            <section className='mainSwipe'>
            <h2 className='mainSwipeH2'>Main Page</h2>
            <div className='mainNav'>
                <button className='profileButton'>profile</button>
                <button className='messagesButton'>messages</button>
            </div>
            {<li className='mainSwipeUser'>
                <img src={userOne.avatar} alt='avatar' className='mainImage'></img>
                <h3>{userOne.display_name}</h3>
                <p>{userOne.bio}</p>
                <span>{userOne.platforms}</span>
                {' '}
                <span>{userOne.lfm_in}</span>
            </li>}
            <div className='secondNav'>
                <button className='noButton'>No</button>
                <button className='yesButton'>Yes</button>
            </div>
            </section>
        )
    }
}