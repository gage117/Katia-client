import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import users from '../../store'
import cardsIcon from '../../images/cards.png'
import editIcon from '../../images/edit-icon.png'
import nintendoNetworkLogo from '../../images/nintendo_logo.png'
import playstationLogo from '../../images/Playstation_logo_colour.svg'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import xboxLogo from '../../images/Xbox_one_logo.svg'
import checkmarkSVG from '../../images/checkmark-circle-2.svg'
import x_markSVG from '../../images/x-circle.svg'
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

    handleEditSubmit = event => {
        document.getElementsByClassName('editForm')[0].submit()
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
                <div className='profile__ImgEdit-container'>
                    <img src={currentUser.avatar} 
                    alt='avatar' className='profile__ImgEdit' />
                </div>
                <form className='editForm' name='editForm' onSubmit={this.saveEdit}>
                    <label htmlFor='username'>Display Name</label>
                    <input type='text' name='username' 
                    id='username' defaultValue={currentUser.display_name} />
                    <label htmlFor='lfm'>LFM In</label>
                    <textarea rows='7' cols='40' name='lfm' 
                    id='lfm' defaultValue={currentUser.lfm_in} />
                    <label htmlFor='platforms'> Platforms</label>
                    <div type='text' name='platforms' 
                    id='platforms'>
                        <img className='main__xbox' src={xboxLogo} alt='Xbox logo' />
                        <img className='main__playstation' src={playstationLogo} alt='Playstation logo' />
                        <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' />
                        <img className='main__PC' src={PC_Logo} alt='PC logo' />
                    </div>
                    <label htmlFor='bio'>Bio</label>
                    <textarea rows='7' cols='40' name='bio'
                    id='bio' defaultValue={currentUser.bio} />
                    <div className='editCancelSubmit-div'>
                        <img className='editCancel' src={x_markSVG} alt='cancel-button' onClick={this.context.resetEditing} />
                        <img className='editSubmit' src={checkmarkSVG} alt='submit-button' onClick={this.handleEditSubmit} />
                    </div>
                </form>
                </>
            )
        }
    }
}