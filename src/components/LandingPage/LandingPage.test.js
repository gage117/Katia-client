import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })
  // Snapshot testing can be done later
  // it('renders the UI as exptected', () => {
  //   const tree = renderer
  //     .create(
  //       <BrowserRouter>
  //         <LandingPage />
  //       </BrowserRouter>
  //     )
  //     .toJSON()
  //   expect(tree).toMatchSnapshot()
  // })
})