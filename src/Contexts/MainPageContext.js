import React from 'react'

const MainPageContext = React.createContext({
    users: [],
    firstUser: {},
    state: {},
    isEditing: false,
    expanded: false,
    setUsers: () => {},
    setCurrentProfile: () => {},
    setEditingToTrue: () => {},
    resetEditing: () => {},
    setExpandedToTrue: () => {},
    resetExpanded: () => {},
})

export default MainPageContext

export class MainPageProvider extends React.Component {
    state = {
        users: [],
        firstUser: {},
        isEditing: false,
        expanded: false,
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

    setExpandedToTrue = () => {
        this.setState({ expanded: true })
    }

    resetExpanded = () => {
        this.setState({ expanded: false })
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
            expanded: this.state.expanded,
            setExpandedToTrue: this.setExpandedToTrue,
            resetExpanded: this.resetExpanded,
        }

        return (
            <MainPageContext.Provider value={value}>
                {this.props.children}
            </MainPageContext.Provider>
        )
    }
}