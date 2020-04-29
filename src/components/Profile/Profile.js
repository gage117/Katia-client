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
        selectedFile: null,
        avatar: '',
        display_name: '',
        lfm_in: '',
        bio: '',
        platforms: '',
        genres: [],
        allGenres: [],
        currGenre: '',
    }

    componentDidMount() {
        ProfileService.getAllUserGenres()
        .then(res => this.setState({ allGenres: res }))


        ProfileService.getProfile(this.context.user_id)
        .then(user => this.setState({ 
            avatar: user.avatar,
            display_name: user.display_name,
            lfm_in: user.lfm_in,
            bio: user.bio,
            platforms: user.platforms,
            genres: user.genres
         }))
         .catch(error => this.setState({error: error.message}))
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
        .catch(error => this.setState({error: error.message}))
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

    handleGenresChange = event => {
        this.setState({ genres: event.target.value })
    }

    handleSelectGenre = event => {
        this.setState({ currGenre: event.target.value })
    }

    avatarChangedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    avatarUploadHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('profileImg', this.state.selectedFile);
        ProfileService.uploadAvatar(this.context.user_id, formData)
            .then(res => {
                this.setState({ avatar: res.location });
            })
            .catch(error => this.setState({ error }));
    }

    genreToSelect = event => {
        event.preventDefault()
        console.log('click')

        if(this.state.currGenre !== '') {
        this.state.genres.push(this.state.currGenre)
        }
        console.log(this.state.genres)
    }

    render() {
        console.log(this.state.currGenre)
        console.log(this.state.genres)
        let allGenres = this.state.allGenres || []
        let userGenres = this.state.genres || []
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
                        <input type='file' onChange={this.avatarChangedHandler} />
                        <button className='profile__ImgEdit-submit' onClick={this.avatarUploadHandler}>Upload</button>
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
                        <label htmlFor='genres'>Genres</label>
                        {this.state.genres.map(item => <span>{item}</span>)}
                        <select onChange={this.handleSelectGenre}>
                            {/* {this.state.allGenres.map((item, index) => 
                            this.state.genres.includes(item.genre) ? 
                            console.log(item.genre) 
                            : <option key={index} value={item.genre}>{item.genre}</option>)} */}
                            {allGenres.map((item, index) => 
                            userGenres.includes(item.genre) ? 
                            console.log(item.genre) 
                            : <option key={index} value={item.genre}>{item.genre}</option>)}
                        </select>
                        <button onClick={this.genreToSelect}>Save Genre</button>
                        {/* <input type='text' name='genres' onChange={this.handleGenresChange}
                        id='genres' defaultValue={genres} /> */}
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