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
import AuthApiService from '../../services/auth-api-service'

export default class Profile extends React.Component {
    static contextType = UserContext

    state = {
        isEditing: false,
        display_name: '',
        lfm_in: '',
        bio: '',
    }

    componentDidMount() {
        const { user } = this.context
        this.setState({ 
            display_name: user.display_name,
            lfm_in: user.lfm_in,
            bio: user.bio,
        })
    }

    handleEditButton = event => {
        event.preventDefault()
        this.setState({ isEditing: true })
    }

    saveEdit = event => {
        event.preventDefault()
        const { user } = this.context
        const userInfo = {
            display_name: this.state.display_name,
            lfm_in: this.state.lfm_in,
            bio: this.state.bio,
        }
        
        ProfileService.updateProfile(user.id, userInfo)
        .then(user => {
            this.context.updateUser(user)
            // AuthApiService.refreshToken()
            // .then(res => console.log(res))
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

    generateGenreString = (genres) => {
        try {
            let genreString = '';
            if (genres.length === 0) {
                genreString = 'No Genres Chosen'
            } else if (genres.length === 1) {
                genreString = genres[0]
            } else {
                for (let i = 0; i < genres.length; i++) {
                    if (i < genres.length - 1) {
                        genreString += `${genres[i]}, `
                    } else if (i === genres.length - 1) {
                        genreString += `${genres[i]}`
                    }
                }
            }
            return genreString
            }
        catch {
            return ''
        }
    }

    render() {
        const { user } = this.context;
        console.log(this.state)

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
                    <img src={user.avatar} 
                    alt='avatar' className='profile__Img' />
                    <p>Display Name</p>
                    <span>{user.display_name}</span>
                    <p>Platforms</p>
                    <div id='platforms'>
                        {/* user.platforms */}
                        {user.platforms.includes("Xbox") ? <img className='main__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {user.platforms.includes("PlayStation") ? <img className='main__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {user.platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoNetworkLogo} alt='Nintendo logo' /> : null}
                        {user.platforms.includes("PC") ? <img className='main__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>
                    <p>LFM In</p>
                    {/* {this.generateLfmElements(user.lfm_in)} */}
                    <p>{user.lfm_in}</p>
                    <p>Genres</p>                    
                    <span>{this.generateGenreString(user.genres)}</span>
                    <p>Bio</p>
                    <span className='profile__bio'>{user.bio}</span>
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
                    <img src={user.avatar} 
                    alt='avatar' className='profile__ImgEdit' />
                </div>
                <form className='editForm' name='editForm' onSubmit={this.saveEdit}>
                    <label htmlFor='username'>Display Name</label>
                    <input type='text' name='username' onChange={this.handleDisplayNameChange}
                    id='username' defaultValue={user.display_name} />
                    <label htmlFor='lfm'>LFM In</label>
                    <textarea rows='7' cols='40' name='lfm' onChange={this.handleLookingForChange}
                    id='lfm' defaultValue={user.lfm_in} />
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
                    id='bio' defaultValue={user.bio} />
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