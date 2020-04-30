import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
import cardsIcon from '../../images/cards.png'
import editIcon from '../../images/edit-icon.png'
import nintendoLogo from '../../images/nintendo_logo.png'
import nintendoLogoGray from '../../images/nintendo_logo_b&w.png'
import playstationLogo from '../../images/playstation_color_png.png'
import playstationLogoGray from '../../images/playstation_b&w_png.png'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import PC_LogoGray from '../../images/PC_Keyboard_Mouse_Icon_b&w.png'
import xboxLogo from '../../images/xbox_logo_png.png'
import xboxLogoGray from '../../images/xbox_logo_b&w_png.png'
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
        platforms: [],
        genres: [],
        allGenres: [],
        currGenre: '',
        error: null
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

    handlePlatformsChange = event => {
        const platform = event.target.name
        this.state.platforms.includes(platform) ?
            this.setState({
                platforms: this.state.platforms.filter(item => item !== platform)
            })
            :
            this.setState({
                platforms: [platform, ...this.state.platforms]
            })
    }

    generateEditPlatforms = () => {
        return (
            <>
            {this.state.platforms.includes('Xbox') ? <img name='Xbox' className='main__xbox' src={xboxLogo} alt='Xbox logo' onClick={this.handlePlatformsChange}/> : <img  name='Xbox' className='main__xbox' src={xboxLogoGray} alt='Xbox logo gray' onClick={this.handlePlatformsChange} />}
            {this.state.platforms.includes('PlayStation') ? <img name='PlayStation' className='main__playstation' src={playstationLogo} alt='Playstation logo' onClick={this.handlePlatformsChange} /> : <img name='PlayStation'  className='main__playstation' src={playstationLogoGray} alt='Playstation logo gray' onClick={this.handlePlatformsChange} />}
            {this.state.platforms.includes('Nintendo') ? <img name='Nintendo' className='main__nintendo' src={nintendoLogo} alt='Nintendo logo' onClick={this.handlePlatformsChange} /> : <img name='Nintendo' className='main__nintendo' src={nintendoLogoGray} alt='Nintendo logo gray' onClick={this.handlePlatformsChange} />}
            {this.state.platforms.includes('PC') ? <img name='PC' className='main__PC' src={PC_Logo} alt='PC logo' onClick={this.handlePlatformsChange} /> : <img name='PC' className='main__PC' src={PC_LogoGray} alt='PC logo gray' onClick={this.handlePlatformsChange} />}
            </>
        )
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
        this.setState({ genres: [...this.state.genres, this.state.currGenre] })
        }
        this.setState({ currGenre: '' })
    }

    genreToDelete = event => {
        event.preventDefault()
        console.log(event.target.name)

        let newGenres = this.state.genres.filter(item => item !== event.target.name)
        this.setState({ genres: newGenres })
    }

    render() {
        console.log(this.state)
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
                        {platforms && platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoLogo} alt='Nintendo logo' /> : null}
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
                    <label htmlFor='display-name'>Display Name</label>
                    <input type='text' name='display-name' onChange={this.handleDisplayNameChange}
                    id='display-name' defaultValue={display_name} />
                    <label htmlFor='lfm'>LFM In (Max 3, Separated by ",")</label>
                    <textarea rows='7' cols='40' name='lfm' onChange={this.handleLookingForChange}
                    id='lfm' defaultValue={lfm_in} />
                    <label htmlFor='platforms'> Platforms</label>
                    <div type='text' name='platforms' 
                    id='platforms'>
                        {this.generateEditPlatforms()}
                    </div>
                    <label htmlFor='genres'>Genres</label>
                        {userGenres.map((item, index) => 
                            <div key={index}>
                            <span>{item}</span>
                            <button name={item} onClick={(item) => this.genreToDelete(item)}>delete</button>
                            </div>)}
                        <select onChange={this.handleSelectGenre}>
                            <option value=''>Select a genre</option>
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