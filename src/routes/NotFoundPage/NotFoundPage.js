import React, { Component } from 'react'
import './NotFoundPage.css'

export default class NotFoundPage extends Component {
  render() {
    return (
      <section className='NotFoundPage'>
        <h2>404 - Page not found</h2>
        <h4>Fortunately, unlike a corrupted save file, you can just go back to where you last were!</h4>
        <p>Try going back to the previous page.</p>
      </section>
    )
  }
}
