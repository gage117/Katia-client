import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import Chat from './Chat'
import { UserProvider } from '../../Contexts/UserContext'

describe('<Chat />', () => {
  const testData = {
    messages: [
      {
        id: 1,
        conversation_id: 1,
        sender_id: 1,
        message: 'hi'
      },
      {
        id: 2,
        conversation_id: 1,
        sender_id: 2,
        message: 'sup'
      }
    ],
    user_id: 1,
    user: {
      display_name: 'Test User 1',
      avatar: 'https://katia-app.s3-us-west-1.amazonaws.com/default_avatar.png'
    },
    partner: {
      display_name: 'Test User 2',
      avatar: 'https://katia-app.s3-us-west-1.amazonaws.com/default_avatar.png'
    }
  }
  // Smoke test
  it('renders without crashing', () => {

    window.HTMLElement.prototype.scrollIntoView = function() {};

    const div = document.createElement('div')
    ReactDOM.render(
      <MemoryRouter>
        <UserProvider>
          <Chat messages={testData.messages} user_id={testData.user_id} user={testData.user} partner={testData.partner} />
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
            <Chat messages={testData.messages} user_id={testData.user_id} user={testData.user} partner={testData.partner} />
          </UserProvider>
        </MemoryRouter>,
        {
          createNodeMock: (element) => {
            if(element.type === 'div') {
              return {
                scrollIntoView: (obj) => {
                  return true;
                }
              };
            }
            return true;
          }
        }
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})