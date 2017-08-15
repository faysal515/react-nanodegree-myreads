import React from 'react'
import Book from './book'
import Loader from './loader'

import {
  Link
} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  submitHandler(e) {
    e.preventDefault()
    this.setState({loading: true})
    this.props.search(this.refs.search.value)
      .then(r => {
        this.setState({loading: false})
      })
  }

  // &#x2713;

  render() {
    let {searchResults} = this.props
    return <div className="search-books">
      <div className="search-books-bar">
        <Link to={`/`} className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <form onSubmit={(e) =>this.submitHandler(e)}>
            <input ref="search" type="text" placeholder="Search by title or author"/>
          </form>


        </div>
      </div>
      {!this.state.loading ?
        <div className="search-books-results animate-bottom">
        <ol className="books-grid">
          {searchResults.length > 0 ? searchResults.map((b) => {
            // let status = this.defaultBookStatus(b)
            return <li key={b.id}>{Book(b,this.props.changeStatus, b.shelf)}</li>
          }) : null}
        </ol>
      </div> : Loader()}
    </div>
  }
}