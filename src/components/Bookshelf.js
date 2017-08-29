import React, { Component } from 'react'

class Bookshelf extends Component {
  
  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book) => {
                return (
                  <li key={book.title}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: book.coverWidth, height: book.coverHeight, backgroundImage: book.coverImage }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={this.props.list}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>                  
                )
              })
            }
          </ol>
        </div>
      </div>      
    )
  }

}


export default Bookshelf