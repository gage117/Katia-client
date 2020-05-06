import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import Profile from './Profile'
import { UserProvider } from '../../Contexts/UserContext'

describe('<Profile />', () => {
  // Smoke test
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <MemoryRouter>
        <UserProvider>
          <Profile />
        </UserProvider>
      </MemoryRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  // Snapshot test
  it('renders the UI as expected', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <UserProvider>
            <Profile />
          </UserProvider>
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})