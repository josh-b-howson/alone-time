/**
* A wrapper class for Books objects.
*/
export default class Books {

  /**
   * Constructor  
   * @param {response object} response - Response from bibleConnector.getBooks()
   */
  constructor(response) {
    this.init(response)
  }

  init(response) {
    this.books = [];
    response.then((books) => {
      for (let book of books) {
        this.books.push(book);
      }
    })
  }

  getAllBooks() {
    return this.books;
  }
}
