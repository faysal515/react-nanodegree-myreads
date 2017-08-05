import React from 'react'
import Book from './book'

import {
  Link
} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

export default class Search extends React.Component {

  submitHandler(e) {
    e.preventDefault()
    console.log(this.refs.search.value)
    this.props.search(this.refs.search.value)
  }

  defaultBookStatus(book) {
    let isExist = this.props.mine.find(m => m.id === book.id)
    return isExist ? isExist.status : ``
  }

  // &#x2713;

  render() {
    let {searchResults} = this.props
    return <div className="search-books">
      <div className="search-books-bar">
        <Link to={`/`} className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          {/*
           NOTES: The search from BooksAPI is limited to a particular set of search terms.
           You can find these search terms here:
           https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

           However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
           you don't find a specific author or title. Every search is limited by search terms.
           */}
          <form onSubmit={(e) =>this.submitHandler(e)}>
            <input ref="search" type="text" placeholder="Search by title or author"/>
          </form>


        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.length > 0 ? searchResults.map((b) => {
            let status = this.defaultBookStatus(b)
            return <li key={b.id}>{Book(b,this.props.changeStatus, status)}</li>
          }) : null}
        </ol>
      </div>
    </div>
  }
}