import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import Main from './Main'
import { UserProvider } from '../../Contexts/UserContext'

describe('<Main />', () => {
  // Smoke test
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <MemoryRouter>
        <UserProvider>
          <Main />
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
            <Main />
          </UserProvider>
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})