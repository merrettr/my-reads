import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import Book from './Book';

const mapBook = ({
  title,
  authors: [author],
  imageLinks: { smallThumbnail },
  industryIdentifiers: [{ identifier }],
}) =>
  <Book
    key={identifier}
    title={title}
    author={author}
    imageUrl={smallThumbnail}
  />;

const BookList = ({ books }) =>
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <Shelf title="Currently Reading">
        {books.filter(({ shelf }) => shelf === 'currentlyReading').map(mapBook)}
      </Shelf>
      <Shelf title="Want to Read">
        {books.filter(({ shelf }) => shelf === 'wantToRead').map(mapBook)}
      </Shelf>
      <Shelf title="Read">
        {books.filter(({ shelf }) => shelf === 'read').map(mapBook)}
      </Shelf>
    </div>
    <div className="open-search">
      <Link to="/search">Add a book</Link>
    </div>
  </div>;

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookList;
