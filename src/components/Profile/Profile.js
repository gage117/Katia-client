import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import cardsIcon from '../../images/cards.png'
import editIcon from '../../images/edit-icon.png'
import nintendoNetworkLogo from '../../images/nintendo_logo.png'
import playstationLogo from '../../images/Playstation_logo_colour.svg'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import xboxLogo from '../../images/Xbox_one_logo.svg'
import checkmarkSVG from '../../images/checkmark-circle-2.svg'
import x_markSVG from '../../images/x-circle.svg'
import UserContext from '../../Contexts/UserContext'
import ProfileService from '../../services/profile-service'

export default class Profile extends React.Component {
    static contextType = UserContext

    state = {
        isEditing: false,
        avatar: '',
        display_name: '',
        lfm_in: [],
        bio: '',
        platforms: [],
        genres: [],
    }

    componentDidMount() {
        ProfileService.getProfile(this.context.user_id)
        .then(user => this.setState({ 
            avatar: user.avatar,
            display_name: user.display_name,
            lfm_in: user.lfm_in,
            bio: user.bio,
            platforms: user.platforms,
            genres: user.genres
         }))
    }

    handleEditButton = event => {
        event.preventDefault()
        this.setState({ isEditing: true })
    }

    saveEdit = event => {
        event.preventDefault()
        const { user_id } = this.context
        const userInfo = {
            display_name: this.state.display_name,
            lfm_in: this.state.lfm_in,
            bio: this.state.bio,
            platforms: this.state.platforms,
            genres: this.state.genres
        }
        
        ProfileService.updateProfile(user_id, userInfo)
        .then(user => {
            this.setState({ 
                isEditing: false,
                display_name: user.display_name,
                lfm_in: user.lfm_in,
                bio: user.bio,
                platforms: user.platforms,
                genres: user.genres
            })
        })
    }

    cancelEdit = () => {
        this.setState({ isEditing: false })
    }

    handleLogoutClick = () => {
        this.context.processLogout()
    }

    handleDisplayNameChange = event => {
        this.setState({ display_name: event.target.value })
    }

    handleLookingForChange = event => {
        this.setState({ lfm_in: event.target.value })
    }

    handleBioChange = event => {
        this.setState({ bio: event.target.value })
    }

    generateLfmElements = (games) => {
        return games.map(game => {
            return (<span className='main__lfm-in' key={game}>{game}</span>)
        })
    }

    render() {
        const { avatar, display_name, bio, lfm_in, genres, platforms } = this.state;

        if(!this.state.isEditing) {
            return (
                <>
                <div className='profile__icons-container'>
                    <Link to='/swipe' className='profile__Link'>
                        <img className='profile__cards-icon' src={cardsIcon} alt='swipe-cards-icon' />
                    </Link>
                    <img className='profile__edit-icon' onClick={this.handleEditButton} src={editIcon} alt='edit-icon' />
                </div>
                <div className='profile__Div'> 
                    <img src={avatar} 
                    alt='avatar' className='profile__Img' />
                    <h4 className='profile__card-header'>Display Name</h4>
                    <span>{display_name}</span>
                    <h4 className='profile__card-header'>Platforms</h4>
                    <div id='platforms'>
                        {platforms && platforms.includes("Xbox") ? <img className='main__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {platforms && platforms.includes("PlayStation") ? <img className='main__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {platforms && platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' /> : null}
                        {platforms && platforms.includes("PC") ? <img className='main__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>
                    <h4 className='profile__card-header'>LFM In</h4>
                    {this.context.generateLfmElements(lfm_in)}
                    <p>{lfm_in}</p>
                    <h4 className='profile__card-header'>Genres</h4>                    
                    <span>{this.context.generateGenreString(genres)}</span>
                    <h4 className='profile__card-header'>Bio</h4>
                    <span className='profile__bio'>{bio}</span>
                </div>
                <div className='logoutLink-container'>
                    <Link onClick={this.handleLogoutClick} 
                    to='/login' className='logoutLink'>
                    Logout
                    </Link>
                </div>
                </>
            )
        } else if(this.state.isEditing) {
            return (
                <>
                <div className='profile__ImgEdit-container'>
                    <img src={avatar} 
                    alt='avatar' className='profile__ImgEdit' />
                </div>
                <form className='editForm' name='editForm' onSubmit={this.saveEdit}>
                    <label htmlFor='username'>Display Name</label>
                    <input type='text' name='username' onChange={this.handleDisplayNameChange}
                    id='username' defaultValue={display_name} />
                    <label htmlFor='lfm'>LFM In</label>
                    <textarea rows='7' cols='40' name='lfm' onChange={this.handleLookingForChange}
                    id='lfm' defaultValue={lfm_in} />
                    <label htmlFor='platforms'> Platforms</label>
                    <div type='text' name='platforms' 
                    id='platforms'>
                        <img className='main__xbox' src={xboxLogo} alt='Xbox logo' />
                        <img className='main__playstation' src={playstationLogo} alt='Playstation logo' />
                        <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' />
                        <img className='main__PC' src={PC_Logo} alt='PC logo' />
                    </div>
                    <label htmlFor='bio'>Bio (Max 250 chars.)</label>
                    <textarea rows='7' cols='40' name='bio' onChange={this.handleBioChange}
                    id='bio' defaultValue={bio} />
                    <div className='editCancelSubmit-div'>
                        <img className='editCancel' src={x_markSVG} alt='cancel-button' onClick={this.cancelEdit} />
                        <img className='editSubmit' src={checkmarkSVG} alt='submit-button' onClick={this.saveEdit}/>
                    </div>
                </form>
                </>
            )
        }
    }
}