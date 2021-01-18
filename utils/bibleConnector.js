// import { getBibleApiKey } from "../utils/utils";

/* UNSAFE! Eventually make key secret and not available on the front end. */
const API_KEY = /* getBibleApiKey() */ '8b2b2de8fc67cb6d51223b958cc91115';

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
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${id}`, options);
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
export function getResults(query, options) {
  const bibleId = placeholderVersionId;

  if (!query.version) return null;
  let searchUrl = `https://api.scripture.api.bible/v1/bibles/${query.version}/search`;

  /* Concatenate search parameters */
  if (query.search)
    searchUrl += `?query=${query.search}`;
  if (query.page)
    // -1 since offset starts counting at 0
    searchUrl += `&offset=${query.page - 1}`;
  if (query.sort && ['relevance', 'canonical', 'reverse-canonical'].includes(query.sort))
    searchUrl += `&sort=${query.sort}`;

  return fetchFromApi(searchUrl, options);
}
