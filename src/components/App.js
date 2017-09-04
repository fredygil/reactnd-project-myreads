import React from 'react'
import * as BooksAPI from '../api/BooksAPI'
import Bookshelf from './Bookshelf'
import BookItem from './BookItem'
import '../styles/App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    booksResult: []
  }

  componentDidMount = () => {
    BooksAPI.getAll().then((response) => {
      const books = response.map((book) => this.getBookData(book))
      this.setState({books})
    })
  }

  getBookData = (book) => {
    return ({
      id: book.id,
      title: book.title,
      authors: (book.authors ? book.authors.join(', ') : ''),
      coverImage: (book && book.imageLinks) ? book.imageLinks.smallThumbnail : '',
      shelf: book.shelf
    })
  }

  getBooks = (shelf) => {
    return this.state.books
    .filter((book) => (book.shelf === shelf))
    //.map((book) => this.getBookData(book))    
  }

  setBookshelf = (book, shelf) => {
    if (book.shelf !== shelf){
      BooksAPI.update(book, shelf)
      .then((response) => {
        if (book.shelf === undefined){
          this.setState((prevState) => {
            let newBook = this.getBookData(book)
            newBook.shelf = shelf
            prevState.books.push(newBook)
            return {
              books: prevState.books
            }
          })
        } else {
          this.setState((prevState) => {
            return {
              books: prevState.books.map((stateBook) => {
                if (stateBook.id === book.id){
                  stateBook.shelf = shelf
                }
                return stateBook
              })
            }
          })
        }
      })
    }
  }  

  getCurrentShelf = (book) => {
    const foundBook = this.state.books.find((stateBook) => (stateBook.id === book.id))
    if (foundBook)
      return foundBook.shelf
    return undefined
  }

  searchBook = (e) => {
    BooksAPI.search(e.target.value, 10)
    .then((response) => {
      this.setState({booksResult:  (response && !response.error ? response.map((book) => ({...book, shelf: this.getCurrentShelf(book)})): [])})
    })
  }

  render() {
     return (
      <div className="app">
        <Route 
          path="/search" 
          render={({ history }) => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  {/* 
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author" onChange={this.searchBook} />
                  
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                {
                  this.state.booksResult.map((book) => {
                    return (
                      <BookItem 
                        key={book.id}
                        book={book} 
                        setBookshelf={this.setBookshelf}
                      />
                    )
                  })
                }
                </ol>
              </div>
            </div>
          )}
        />
        <Route exact path="/" 
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf 
                    title="Currently Reading" 
                    books={this.getBooks('currentlyReading')}
                    setBookshelf={this.setBookshelf}
                  />
                  <Bookshelf 
                    title="Want to Read" 
                    books={this.getBooks('wantToRead')}
                    setBookshelf={this.setBookshelf}
                  />
                  <Bookshelf 
                    title="Read" 
                    books={this.getBooks('read')}
                    setBookshelf={this.setBookshelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  Add a book
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
