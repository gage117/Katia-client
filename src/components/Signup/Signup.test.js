import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import Signup from './Signup'

describe('Signup', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  // Snapshot tests can be done later
  // it('renders the UI as exptected', () => {
  //   const tree = renderer
  //     .create(
  //       <BrowserRouter>
  //         <Signup />
  //       </BrowserRouter>
  //     )
  //     .toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
})