import React from 'react'
import {Link} from 'react-router-dom'
import Book from './book'
export default class BookList extends React.Component {
  render() {
    let current = this.props.mine.filter(b => b.status === 'current'),
      want = this.props.mine.filter(b => b.status === 'want'),
      read = this.props.mine.filter(b => b.status === 'read')

    return <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {current.map(b => <li key={b.id}>{Book(b,this.props.changeStatus,b.status)}</li>)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {want.map(b => <li key={b.id}>{Book(b,this.props.changeStatus,b.status)}</li>)}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {read.map(b => <li key={b.id}>{Book(b,this.props.changeStatus,b.status)}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to={`/search`}>Add a book</Link>
      </div>
    </div>
  }
}