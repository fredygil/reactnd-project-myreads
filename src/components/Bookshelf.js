import React, { Component } from 'react'
import BookItem from './BookItem'

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
                  <BookItem 
                    key={book.id}
                    book={book} 
                    setBookshelf={this.props.setBookshelf}
                  />
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