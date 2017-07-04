import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import Book from './Book';

const BookList = ({ books, onMoveBook }) => {
  const renderBook = book =>
    <Book
      key={book.id}
      {...book}
      onMoveShelf={shelf => onMoveBook(book, shelf)}
    />;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Shelf title="Currently Reading">
          {books
            .filter(({ shelf }) => shelf === 'currentlyReading')
            .map(renderBook)}
        </Shelf>
        <Shelf title="Want to Read">
          {books.filter(({ shelf }) => shelf === 'wantToRead').map(renderBook)}
        </Shelf>
        <Shelf title="Read">
          {books.filter(({ shelf }) => shelf === 'read').map(renderBook)}
        </Shelf>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMoveBook: PropTypes.func.isRequired,
};

export default BookList;
