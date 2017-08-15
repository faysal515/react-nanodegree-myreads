import React from 'react'
import {Link} from 'react-router-dom'
import Book from './book'

export default class BookShelf extends React.Component {
  render() {
    let data = this.props.books
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {data.map(b => <li key={b.id}>{Book(b,this.props.changeStatus,b.shelf)}</li>)}
        </ol>
      </div>
    </div>
  }
}