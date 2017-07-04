import React from 'react';
import PropTypes from 'prop-types';

const Book = ({
  id,
  title,
  shelf,
  authors = [],
  imageLinks = {},
  onMoveShelf,
}) =>
  <div className="book">
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          backgroundImage: `url("${imageLinks.smallThumbnail}")`,
        }}
      />
      <div className="book-shelf-changer">
        <select value={shelf} onChange={ev => onMoveShelf(ev.target.value)}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">
      {title}
    </div>
    <div className="book-authors">
      <span>
        {authors.join(', ')}
      </span>
    </div>
  </div>;

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  shelf: PropTypes.string.isRequired,
  imageLinks: PropTypes.shape({
    smallThumbnail: PropTypes.string.isRequired,
  }),
  onMoveShelf: PropTypes.func.isRequired,
};

export default Book;
