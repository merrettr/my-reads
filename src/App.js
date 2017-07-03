import React from 'react';
import { Route } from 'react-router-dom';
import { getAll } from './BooksAPI';
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

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => <BookList books={this.state.books} />}
        />
        <Route exact path="/search" component={Search} />
      </div>
    );
  }
}

export default BooksApp;
