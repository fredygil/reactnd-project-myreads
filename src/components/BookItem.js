import React, { Component } from 'react'

class BookItem extends Component {
  render(){
    const book = this.props.book
   
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.coverImage}")` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={this.props.list} onChange={(e) => this.props.setBookshelf(book, e.target.value)}>
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
  }

}

export default BookItem