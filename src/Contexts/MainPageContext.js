import React from 'react'

const MainPageContext = React.createContext({
    users: [],
    firstUser: {},
    state: {},
    setUsers: () => {},
    setCurrentProfile: () => {},
})

export default MainPageContext

export class MainPageProvider extends React.Component {
    state = {
        users: [],
        firstUser: {},
    }

    setUsers = users => {
        this.setState({ users })
    }

    setCurrentProfile = user => {
        this.setState({ firstUser: user })
    }

    render() {
        const value = {
            users: this.state.users,
            firstUser: this.state.firstUser,
            state: this.state,
            setUsers: this.setUsers,
            setCurrentProfile: this.setCurrentProfile
        }

        return (
            <MainPageContext.Provider value={value}>
                {this.props.children}
            </MainPageContext.Provider>
        )
    }
}