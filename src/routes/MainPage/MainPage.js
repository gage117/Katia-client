import React, {Component} from 'react'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'

export default class MainPage extends Component {

  render() {
    return (
      <main>
        <Header />
        <Main />
      </main>
    )
  }
}