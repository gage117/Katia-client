import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import users from '../../store'
import cardsIcon from '../../images/cards.png'
import editIcon from '../../images/edit-icon.png'
import MainPageContext from '../../Contexts/MainPageContext'

export default class Profile extends React.Component {
    static contextType = MainPageContext

    componentDidMount() {
        this.context.resetEditing()
    }

    handleEditButton = event => {
    event.preventDefault()

    this.context.setEditingToTrue()
    }

    saveEdit = event => {
        event.preventDefault()

        this.resetEditing()
    }

    componentWillUnmount() {
        this.context.resetEditing()
    }

    render() {
        const currentUser = users[2] || {}

        if(!this.context.isEditing) {
            return (
                <>
                <div className='profile__icons-container'>
                    <Link to='/swipe' className='profile__Link'>
                        <img className='profile__cards-icon' src={cardsIcon} alt='swipe-cards-icon' />
                    </Link>
                    <img className='profile__edit-icon' onClick={this.handleEditButton} src={editIcon} alt='edit-icon' />
                </div>
                {<div className='editDiv'> 
                    <img src={currentUser.avatar} 
                    alt='avatar' className='profile__Img' />
                    <p>Display Name</p>
                    <span>{currentUser.display_name}</span>
                    <p>Platforms</p>
                    <span>{currentUser.platforms}</span>
                    <p>LFM In</p>
                    <span>{currentUser.lfm_in}</span>
                    <p>Bio</p>
                    <span>{currentUser.bio}</span>
                </div>}
                </>
            )
        } else if(this.context.isEditing) {
            return (
                <>
                <img src={currentUser.avatar} 
                alt='avatar' className='profileImgEdit' />
                <form className='editForm'>
                    <label htmlFor='username'>Username </label>
                    <input type='text' name='username' 
                    id='username' defaultValue={currentUser.display_name}></input>
                    <label htmlFor='bio'>Bio </label>
                    <input type='text' name='bio' 
                    id='bio' defaultValue={currentUser.bio}></input>
                    <label htmlFor='lfm'>lfm in </label>
                    <input type='text' name='lfm' 
                    id='lfm' defaultValue={currentUser.lfm_in}></input>
                    <label htmlFor='platforms'> Platforms: </label>
                    <input type='text' name='platforms' 
                    id='platforms' defaultValue={currentUser.platforms}></input>
                    <input type='submit' onSubmit={this.saveEdit}></input>
                </form>
                </>
            )
        }
    }
}