// import { getBibleApiKey } from "../utils/utils";

/* UNSAFE! Eventually make key secret and not available on the front end. */
const API_KEY = /* getBibleApiKey() */ '131dc8d218e6dfe778238e7aff2efd1f';

const placeholderVersionId = '06125adad2d5898a-01';

const fetchFromApi = (url, options, data) => {
  const opt = {
    method: 'GET',
    headers: {},
  };


  if (data) {
    opt.headers['Content-Type'] = 'application/json'
    opt.body = JSON.stringify(data);
  };

  opt.headers['api-key'] = API_KEY;

  // allow for use on server or client size
  if (options?.window)
    return window.fetch(url, opt);
  else return fetch(url, opt)
}

/**
 * Get versions 
 */
export function getAllVersions(options) {
  // return callBibleAPI(`GET`, `https://api.scripture.api.bible/v1/bibles`);
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles`, options);
}

/**
 * Get version by ID
 */
export function getVersionById(id, options) {
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${id}`);
}

/**
 * Get books list
 */
export function getAllBooks(options) {
  const bibleId = placeholderVersionId;
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books`);
}

/**
 * Get chapters in a book
 */
export function getBookById(bookId, fetchChapterSummaries, options) {
  const bibleId = placeholderVersionId;
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}?include-chapters=${fetchChapterSummaries}`);
}

/**
 * Get chapters in a book. Remember that chapter summaries can be fetched from getBookById().
 */
export function getAllChapters(bookId, options) {
  const bibleId = placeholderVersionId;
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`);
}

/**
 * Search for passages
 */
export function getResults(searchText, options) {
  const bibleId = placeholderVersionId;
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${searchText}}`);

}
