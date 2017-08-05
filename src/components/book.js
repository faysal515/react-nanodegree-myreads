import React from 'react'

const Book = (book,change,status) => {
  return <div className="book">
    <div className="book-top">
      <div className="book-cover"
           style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
      <div className="book-shelf-changer">
        <select defaultValue={status} onChange={(e) => change(e,book)}>
          <option value="" disabled> &#x2713; Move to...</option>
          <option value="current">Currently Reading</option>
          <option value="want">Want to Read</option>
          <option value="read">Read</option>
          {/*<option value="none">None</option>*/}
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors[0]}</div>
  </div>
}

export default Book