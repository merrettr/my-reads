import React from 'react';
import { Route } from 'react-router-dom';
import { getAll, update } from './BooksAPI';
import './App.css';
import Search from './Search';
import BookList from './BookList';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  moveBook = (book, shelf) => {
    update(book, shelf).then(shelves =>
      this.setState(prev => {
        let books = [];

        Object.keys(shelves).forEach(shelf =>
          shelves[shelf].forEach(bookId =>
            books.push({
              ...prev.books.find(({ id }) => id === bookId),
              shelf,
            })
          )
        );

        return { books };
      })
    );
  };

  addBook = (book, shelf) => {
    this.setState(prev => ({
      books: [...prev.books, { ...book, shelf }],
    }));
    update(book, shelf);
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() =>
            <BookList books={this.state.books} onMoveBook={this.moveBook} />}
        />
        <Route
          exact
          path="/search"
          render={() =>
            <Search excludeBooks={this.state.books} onAddBook={this.addBook} />}
        />
      </div>
    );
  }
}

export default BooksApp;
