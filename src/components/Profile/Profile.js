import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import users from '../../store'
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
            <h3 className='profileH3'>My Profile</h3>
            <Link to='/swipe' className='profileLink'>Main</Link>
            {<div className='editDiv'> 
            <img src={currentUser.avatar} 
            alt='avatar' className='profileImg'></img>
            <h4>Username: {currentUser.display_name}</h4>
            <p>Bio: {currentUser.bio}</p>
            <span> Platforms: {currentUser.platforms}</span>
            <span> lfm in: {currentUser.lfm_in}</span>
            </div>}
            <button className='editButton' 
            onClick={this.handleEditButton}>edit</button>
            </>
        )
        } else if(this.context.isEditing) {
            return (
                <>
                <img src={currentUser.avatar} 
                alt='avatar' className='profileImgEdit'></img>
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