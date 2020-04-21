import React from 'react'
import './MainPage.css'
import users from '../../store'
import MainPageContext from '../../Contexts/MainPageContext'


export default class MainPage extends React.Component {
    static contextType = MainPageContext
    componentDidMount() {
        this.context.setUsers(users)
    }

    render() {
        console.log(this.context.state)
        const userOne = this.context.users[0] || {}
        return (
            <section className='mainSwipe'>
            <h2 className='mainSwipeH2'>Main Page</h2>
            {<li className='mainSwipeUser'>
                <h3>{userOne.display_name}</h3>
                <img src={userOne.avatar} alt='avatar'></img>
                <p>{userOne.bio}</p>
                <span>{userOne.platforms}</span>
                {' '}
                <span>{userOne.lfm_in}</span>
            </li>}
            </section>
        )
    }
}