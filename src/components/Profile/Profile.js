import React from 'react'
import './Profile.css'
import { Link } from 'react-router-dom'
<<<<<<< HEAD
import editIcon from '../../images/edit-icon.png'
=======
import editIcon from '../../images/edit-icon.svg'
>>>>>>> 1fd0e6ae2c845ff46ee9c057aea9526562d3724b
import nintendoLogo from '../../images/nintendo_logo.png'
import nintendoLogoGray from '../../images/nintendo_logo_b&w.png'
import playstationLogo from '../../images/playstation_color_png.png'
import playstationLogoGray from '../../images/playstation_b&w_png.png'
import PC_Logo from '../../images/PC_Keyboard_Mouse_Icon.png'
import PC_LogoGray from '../../images/PC_Keyboard_Mouse_Icon_b&w.png'
import xboxLogo from '../../images/xbox_logo_png.png'
import xboxLogoGray from '../../images/xbox_logo_b&w_png.png'
import checkmarkSVG from '../../images/checkmark.svg'
import xSVG from '../../images/x.svg'
import UserContext from '../../Contexts/UserContext'
import ProfileService from '../../services/profile-service'
import GamerTag from '../GamerTag/GamerTag'
import rightArrow from '../../images/right-arrow.svg'

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
        gamer_tags: {
            xbox: '',
            psn: '',
            nintendo: '',
            steam: '',
            discord: '',
            other: ''
        },
        error: null
    }

    componentDidMount() {
        ProfileService.getAllUserGenres()
        .then(res => this.setState({ allGenres: res }))
        .catch(error => this.setState({error: error.message}))

        ProfileService.getProfile(this.context.user_id)
        .then(user => this.setState({ 
            avatar: user.avatar,
            display_name: user.display_name,
            lfm_in: user.lfm_in,
            bio: user.bio,
            platforms: user.platforms,
            genres: user.genres,
            gamer_tags: {
              xbox: user.xbox,
              psn: user.psn,
              nintendo: user.nintendo,
              steam: user.steam,
              discord: user.discord,
              other: user.other
            }
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
            genres: this.state.genres,
            xbox: this.state.gamer_tags.xbox,
            psn: this.state.gamer_tags.psn,
            nintendo: this.state.gamer_tags.nintendo,
            steam: this.state.gamer_tags.steam,
            discord: this.state.gamer_tags.discord,
            other: this.state.gamer_tags.other
        }
        
        ProfileService.updateProfile(user_id, userInfo)
        .then(user => {
            this.setState({ 
                isEditing: false,
                display_name: user.display_name,
                lfm_in: user.lfm_in,
                bio: user.bio,
                platforms: user.platforms,
                genres: user.genres,
                gamer_tags: {
                    xbox: user.xbox,
                    psn: user.psn,
                    nintendo: user.nintendo,
                    steam: user.steam,
                    discord: user.discord,
                    other: user.other
                  }
            })
        })
        .catch(error => this.setState({error: error.message}))
    }

    cancelEdit = () => {
        ProfileService.getAllUserGenres()
        .then(res => this.setState({ allGenres: res }))
        .catch(error => this.setState({error: error.message}))

        ProfileService.getProfile(this.context.user_id)
        .then(user => this.setState({ 
            avatar: user.avatar,
            display_name: user.display_name,
            lfm_in: user.lfm_in,
            bio: user.bio,
            platforms: user.platforms,
            genres: user.genres,
            isEditing: false,
         }))
         .catch(error => this.setState({error: error.message}))
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

    handleGamerTagsChange = event => {
        const platform = event.target.name
        const text = event.target.value
        // initialize the value of our state
        const newValue = {
            xbox: this.state.gamer_tags.xbox,
            psn: this.state.gamer_tags.psn,
            nintendo: this.state.gamer_tags.nintendo,
            steam: this.state.gamer_tags.steam,
            discord: this.state.gamer_tags.discord,
            other: this.state.gamer_tags.other
        }
        newValue[platform] = text
        this.setState({ gamer_tags: 
            newValue
        })
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
        this.setState({ genres: [...this.state.genres, event.target.value] })
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

    genreToDelete = event => {
        event.preventDefault()

        let newGenres = this.state.genres.filter(item => item !== event.currentTarget.id)
        this.setState({ genres: newGenres })
    }

    render() {
        let allGenres = this.state.allGenres || []
        let userGenres = this.state.genres || []
        const { avatar, display_name, bio, lfm_in, genres, platforms, gamer_tags } = this.state
        if (display_name === '') {
            return (
                <div className="lds-roller"><div></div><div></div>
                <div></div><div></div><div></div><div>
                </div><div></div><div></div></div>
            )
        } else if(!this.state.isEditing) { // Checks isEditing value to conditionally render normal or editing page
            return (
                <>
                <section className='profile__icons-container'>
                    <img className='profile__edit-icon' onClick={this.handleEditButton} src={editIcon} alt='edit-icon' />
                    <Link to='/swipe'>
                        <img className='profile__back-icon' src={rightArrow} alt='swipe-back-icon' />
                    </Link>
                </section>
                <section className='profile__section'>
                    <div className='profile__img-name-div'>
                        <div className='profile__img-container'>
                            <img src={avatar} 
                            alt='avatar' className='profile__img' />
                        </div>
                        <span className='profile__displayName'>{display_name}</span>
                    </div>
                    <h4 className='profile__card-header'>Platforms</h4>
                    <div id='platforms'>
                        {platforms && platforms.includes("Xbox") ? <img className='main__xbox' src={xboxLogo} alt='Xbox logo' /> : null}
                        {platforms && platforms.includes("PlayStation") ? <img className='main__playstation' src={playstationLogo} alt='Playstation logo' /> : null}
                        {platforms && platforms.includes("Nintendo") ? <img className='main__nintendo' src={nintendoLogo} alt='Nintendo logo' /> : null}
                        {platforms && platforms.includes("PC") ? <img className='main__PC' src={PC_Logo} alt='PC logo' /> : null}
                    </div>
                    <h4 className='profile__card-header'>LFM</h4>
                    {this.context.generateLfmElements(lfm_in)}
                    <h4 className='profile__card-header'>Genres</h4>                    
                    <span className='profile__genres'>{this.context.generateGenreString(genres)}</span>
                    <h4 className='profile__card-header'>Gamer Tags</h4>
                    <div className='profile__gamer_tags-container'>
                        {gamer_tags.xbox !== '' ? <p className='profile__gamer-tags'>Xbox: {gamer_tags.xbox}</p> : null}
                        {gamer_tags.psn !== '' ? <p className='profile__gamer-tags'>PSN: {gamer_tags.psn}</p> : null}
                        {gamer_tags.nintendo !== '' ? <p className='profile__gamer-tags'>Nintendo: {gamer_tags.nintendo}</p> : null}
                        {gamer_tags.steam !== '' ? <p className='profile__gamer-tags'>Steam: {gamer_tags.steam}</p> : null}
                        {gamer_tags.discord !== '' ? <p className='profile__gamer-tags'>Discord: {gamer_tags.discord}</p> : null}
                        {gamer_tags.other !== '' ? <p className='profile__gamer-tags'>Other: {gamer_tags.other}</p> : null}
                    </div>
                    <h4 className='profile__card-header'>Bio</h4>
                    <span className='profile__bio'>{bio}</span>
                </section>
                <section className='logoutLink-container'>
                    <Link onClick={this.handleLogoutClick} 
                    to='/login' className='blue-button'>
                    Logout
                    </Link>
                </section>
                </>
            )
        } else if(this.state.isEditing) {
            return (
                <>
                <form className='profile__editForm' name='editForm' onSubmit={this.saveEdit}>
                    <div className='profile__editCancelSubmit-div'>
                        <img className='profile__editCancel' src={xSVG} alt='cancel-button' onClick={this.cancelEdit} />
                        <img className='profile__editSubmit' src={checkmarkSVG} alt='submit-button' onClick={this.saveEdit}/>
                    </div>
                    <section className='profile__ImgEdit-container'>
                        <img src={avatar} 
                        alt='avatar' className='profile__ImgEdit' />
                        <div className='profile__imageEditInput'>
                        <input type='file' className='profile__file-upload' onChange={this.avatarChangedHandler} />
                        <button className='blue-button profile__ImgEdit-submit' onClick={this.avatarUploadHandler}>Upload</button>
                        </div>
                    </section>
                    <label htmlFor='display-name'>Display Name</label>
                    <input type='text' name='display-name' onChange={this.handleDisplayNameChange}
                    id='display-name' defaultValue={display_name} />
                    <label htmlFor='lfm'>LFM</label>
                    <textarea rows='7' cols='40' name='lfm' onChange={this.handleLookingForChange}
                    id='lfm' defaultValue={lfm_in} />
                    <label htmlFor='platforms'> Platforms</label>
                    <div type='text' name='platforms' 
                    id='platforms'>
                        {this.generateEditPlatforms()}
                    </div>
                    <label htmlFor='genres'>Genres</label>
                        <div className='profile__editGenreList'>
                            {userGenres.map((item, index) => 
                                <span key={index} className='profile__editGenre' id={item} onClick={(item) => this.genreToDelete(item)}>
                                    <label className='profile__editGenreLabel'>{item}</label>
                                    <svg className='profile__editGenreButton' xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#f00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="20" y1="2" x2="2" y2="20"/>
                                        <line x1="2" y1="2" x2="20" y2="20"/>
                                    </svg>
                                </span>
                            )}
                            <select className='profile__genreSelect' onChange={this.handleSelectGenre}>
                                <option value='' style={{display: "none"}}>Choose Genre</option>
                                {allGenres.map((item, index) => 
                                userGenres.includes(item.genre) ? 
                                null 
                                : <option className='profile__genreSelectItem' key={index} value={item.genre}>{item.genre}</option>)}
                            </select>
                        </div>
                        
                    <h4 className='profile__gamer-tags-header'>Gamer Tags</h4>
                    {Object.entries(gamer_tags).map((item, idx) => {
                        return <GamerTag 
                            key={idx}
                            name={item[0]}
                            defaultVal={item[1]}
                            handleChange={this.handleGamerTagsChange}
                            />
                    })}
                    <label htmlFor='bio'>Bio (Max 250 chars.)</label>
                    <textarea rows='7' cols='40' name='bio' onChange={this.handleBioChange}
                    id='bio' defaultValue={bio} />
                </form>
                </>
            )
        }
    }
}