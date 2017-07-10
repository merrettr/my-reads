import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Promise from 'bluebird';
import { uniqBy } from 'lodash';
import { search } from './BooksAPI';
import Book from './Book';
import Loading from './Loading';

// Enable cancellation on promises
Promise.config({ cancellation: true });

class Search extends Component {
  static propTypes = {
    currentBooks: PropTypes.arrayOf(PropTypes.object),
    onAddBook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    currentBooks: [],
  };

  state = {
    search: '',
    books: [],
    isLoading: false,
  };

  handleSearch = ev => {
    const searchTerm = ev.target.value;

    if (this.promise) {
      this.promise.cancel();
    }

    this.setState({ search: searchTerm });

    if (searchTerm.trim().length === 0) {
      this.setState({ books: [], isLoading: false });
      return;
    }

    this.setState({ isLoading: true });

    this.promise = Promise.resolve(search(searchTerm.trim(), 20))
      .then(books =>
        this.setState(prev => ({
          books: Array.isArray(books)
            ? uniqBy(books, 'id').map(book => ({ ...book, shelf: 'none' }))
            : [],
          isLoading: false,
        }))
      )
      .catch(() => this.setState({ isLoading: false, books: [] }));
  };

  render() {
    const { currentBooks, onAddBook } = this.props;

    const renderBook = book =>
      <Book
        key={book.id}
        {...book}
        onMoveShelf={shelf => onAddBook(book, shelf)}
      />;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.isLoading
            ? <Loading />
            : <ol className="books-grid">
                {this.state.books
                  .map(
                    book =>
                      currentBooks.find(({ id }) => id === book.id) || book
                  )
                  .map(renderBook)}
              </ol>}
        </div>
      </div>
    );
  }
}

export default Search;
