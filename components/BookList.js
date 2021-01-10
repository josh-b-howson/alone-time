import React from 'react';
import Books from '../configs/utils/Books';
import { getBooks } from '../utils/bibleConnector.js';

const BookList = () => {
  const booksResponse = getBooks('0c2ff0a5c8b9069c-01');
  const books = new Books(booksResponse);
  const bookList = books.getAllBooks();
  console.log(bookList);

  return <>
  hello
    {bookList.map(
      book => <div>{book.name}</div>
    )}
  </>
}

export default BookList;
