import React from 'react'

const MainPageContext = React.createContext({
    users: [],
    state: {},
    setUsers: () => {},
})

export default MainPageContext

export class MainPageProvider extends React.Component {
    state = {
        users: [],
    }

    setUsers = users => {
        this.setState({ users })
    }

    render() {
        const value = {
            users: this.state.users,
            state: this.state,
            setUsers: this.setUsers,
        }

        return (
            <MainPageContext.Provider value={value}>
                {this.props.children}
            </MainPageContext.Provider>
        )
    }
}