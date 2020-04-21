import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import Header from './Header'

describe('Header', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  // Snapshot tests can be done later
  // it('renders the UI as expected', () => {
  //   const tree = renderer
  //     .create(
  //       <BrowserRouter>
  //         <Header />
  //       </BrowserRouter>
  //     )
  //     .toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
})