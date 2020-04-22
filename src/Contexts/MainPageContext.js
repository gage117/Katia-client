import React from 'react'

const MainPageContext = React.createContext({
    users: [],
    firstUser: {},
    state: {},
    isEditing: false,
    setUsers: () => {},
    setCurrentProfile: () => {},
    setEditingToTrue: () => {},
    resetEditing: () => {},
})

export default MainPageContext

export class MainPageProvider extends React.Component {
    state = {
        users: [],
        firstUser: {},
        isEditing: false,
    }

    setUsers = users => {
        this.setState({ users })
    }

    setCurrentProfile = user => {
        this.setState({ firstUser: user })
    }

    setEditingToTrue = () => {
        this.setState({ isEditing: true })
    }

    resetEditing = () => {
        this.setState({ isEditing: false })
    }

    render() {
        const value = {
            users: this.state.users,
            firstUser: this.state.firstUser,
            state: this.state,
            setUsers: this.setUsers,
            setCurrentProfile: this.setCurrentProfile,
            isEditing: this.state.isEditing,
            setEditingToTrue: this.setEditingToTrue,
            resetEditing: this.resetEditing,
        }

        return (
            <MainPageContext.Provider value={value}>
                {this.props.children}
            </MainPageContext.Provider>
        )
    }
}