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
      mine: []
    }
  }

  searchBooks(query) {
    console.log(this)
    BooksAPI.search(query, 100) //max result being 100
      .then(res => {
        console.log(res)
        this.setState({
          searchResults: res
        })
      })
      .catch(err => {
        console.log('search failed', err)
      })
  }

  changeStatus(event, book) {
    console.log('changing...', book.title, event.target.value)
    // console.log(this)
    let {mine} = this.state
    let index = mine.findIndex(b => b.id === book.id)
    let newBook = {...book}
    newBook.status = event.target.value
    console.log(index)

    if(index === -1) {
      console.log('in if block')
      this.setState({
        mine: [...mine,newBook]
      })
    } else {
      console.log('in else block')
      mine[index] = newBook
      this.setState({
        mine: [...mine]
      })
    }
    // need to find if the book is already in the shelf
    /*if (!book.status) { // book has been added from search option with no previous records
      let newBook = {...book}
      newBook.status = event.target.value

      mine[event.target.value] = mine[event.target.value].concat(newBook) //immutable
      this.setState({
        mine: mine
      })

    }
    else {
      let index = mine[event.target.value].findIndex(b => b.id === book.id)
      console.log(index)
    }*/


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