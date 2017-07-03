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
    update(book, shelf).then(() => this.setState(prev => ({
      books: prev.books.map(b => {
        if (b.id !== book.id) {
          return b;
        }

        return {
          ...book,
          shelf,
        };
      })
    })))
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <BookList books={this.state.books} onMoveBook={this.moveBook} />}
        />
        <Route exact path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;
