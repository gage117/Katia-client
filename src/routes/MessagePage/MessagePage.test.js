import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import MessagePage from './MessagePage'
import { UserProvider } from '../../Contexts/UserContext'

describe.only('<MessagePage />', () => {

  const testData = {
    match: {
      params: {
        chatPartner: 2
      }
    }
  }

  // Smoke test
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <MemoryRouter>
        <UserProvider>
          <MessagePage match={testData.match} />
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
            <MessagePage match={testData.match} />
          </UserProvider>
        </MemoryRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})