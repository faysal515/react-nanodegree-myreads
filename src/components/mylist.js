import React from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './bookshelf'



export default class BookList extends React.Component {
  render() {

    let current = this.props.allBooks.filter(b => b.shelf === 'currentlyReading'),
      want = this.props.allBooks.filter(b => b.shelf === 'wantToRead'),
      read = this.props.allBooks.filter(b => b.shelf === 'read')

    // console.log('re RENDER', current.length, want.length, read.length)
    return <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf books={current} title={`Currently Reading`} changeStatus={this.props.changeStatus} />
          <BookShelf books={want} title={`Want to Read`} changeStatus={this.props.changeStatus} />
          <BookShelf books={read} title={`Read`} changeStatus={this.props.changeStatus} />
        </div>
      </div>
      <div className="open-search">
        <Link to={`/search`}>Add a book</Link>
      </div>
    </div>
  }
}