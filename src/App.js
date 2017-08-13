import React from 'react'

import './App.css'
import Search from './components/search'
import BookList from './components/mylist'
import * as BooksAPI from './BooksAPI'

import {
  BrowserRouter as Router,
  Route,
  // Link,
  Switch
} from 'react-router-dom'


class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      allBooks: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(res => {
        console.log('my book loaded ', res)
        this.setState({allBooks: res})
      })
  }

  searchBooks(query) {
    console.log(this)
    let {allBooks} = this.state
    return BooksAPI.search(query, 100) //max result being 100
      .then(res => {
        if(res.error) {
          console.log('search failed', res)
          return
        }

        let syncBookData = res.map(book => {
          let hasFoundInList = allBooks.findIndex(b => b.id === book.id)
          if(hasFoundInList > -1) {
            book.shelf = allBooks[hasFoundInList].shelf
          }
          return book
        })
        this.setState({
          searchResults: syncBookData
        })
      })
      .catch(err => {
        console.log('search failed', err)
      })
  }

  changeStatus(event, book) {
    console.log('changing...', book.title, event.target.value)
    // console.log(this)
    let {allBooks, searchResults} = this.state
    let index = allBooks.findIndex(b => b.id === book.id)
    let searchListindex = searchResults.findIndex(b => b.id === book.id)
    let newBook = {...book}
    newBook.shelf = event.target.value
    console.log(index)

    BooksAPI.update(book, event.target.value)
      .then(updated => {
        console.log('book updated', updated)
        index === -1 ? this.appendBookList('allBooks',newBook) : this.updateBookList('allBooks',newBook, index)
        if(searchListindex !== -1) {
          this.updateBookList('searchResults', newBook, searchListindex)
          console.log('change search result too!')
        }

      })

  }

  /*
  * changing bookshelf status dynamically
  * */
  updateBookList(stateName, book,index) {
    console.log('here ', stateName, book.title, index)
    let list = [...this.state[stateName]]
    list[index] = book
    this.setState({
      [stateName] : list
    })
  }

  appendBookList(stateName,book) {
    this.setState({
      [stateName] : [...this.state[stateName], book]
    })
  }


  render() {
    return <Router>
      <Switch>
        <Route exact path='/' render={(props) => (
          <BookList {...props} {...this.state} changeStatus={this.changeStatus.bind(this)}/>
        )}/>


        <Route exact path="/search" render={props => (
          <Search {...props} {...this.state}
                  search={this.searchBooks.bind(this)}
                  changeStatus={this.changeStatus.bind(this)}
          />
        )}/>

      </Switch>


    </Router>
  }
}


class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Routes/>
      </div>
    )
  }
}

export default BooksApp
/*
 * <Route exact path='/' render={(props) => (
 <PageContent {...props} pass_to_page_content='hi' />
 )}/>
 *
 * */