import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Search = () =>
  <div className="search-books">
    <div className="search-books-bar">
      <Link to="/" className="close-search">
        Close
      </Link>
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid" />
    </div>
  </div>;

Search.propTypes = {};

export default Search;
