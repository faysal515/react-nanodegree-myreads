import React from 'react'

const Book = (book,change,status) => {
  console.log(book.authors)
  return <div className="book">
    <div className="book-top">
      <div className="book-cover book-image"
           style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks? book.imageLinks.thumbnail: './icons/book.jpg'})`}}></div>
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
    <div className="book-authors">{book.authors ? book.authors[0]: 'not found'}</div>
  </div>
}

export default Book