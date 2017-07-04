import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { search } from './BooksAPI';
import Book from './Book';
import Loading from './Loading';

class Search extends Component {
  static propTypes = {
    excludeBooks: PropTypes.arrayOf(PropTypes.object),
    onAddBook: PropTypes.func.isRequired,
  };

  static defaultProps = {
    excludeBooks: [],
  };

  state = {
    search: '',
    books: [],
    isLoading: false,
  };

  handleSearch = ev => {
    this.setState({ search: ev.target.value }, () => {
      if (this.state.search.trim().length === 0) {
        return;
      }

      this.setState({ isLoading: true });

      search(this.state.search.trim(), 50)
        .then(books =>
          this.setState({
            books: Array.isArray(books) ? books : [],
            isLoading: false,
          })
        )
        .catch(() => this.setState({ isLoading: false }));
    });
  };

  render() {
    const { excludeBooks, onAddBook } = this.props;

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
                  .filter(book => {
                    return !excludeBooks.find(({ id }) => id === book.id);
                  })
                  .map(renderBook)}
              </ol>}
        </div>
      </div>
    );
  }
}

export default Search;
