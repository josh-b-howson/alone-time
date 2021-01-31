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
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${id}`, options);
}

/**
 * Get books list
 */
export function getAllBooks(version, options) {
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${version}/books`, options);
}

/**
 * Get chapters in a book
 */
export function getBookById(bookId, version, fetchChapterSummaries, options) {
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${version}/books/${bookId}?include-chapters=${fetchChapterSummaries}`, options);
}

/**
 * Get chapters in a book. Remember that chapter summaries can be fetched from getBookById().
 */
export function getAllChapters(bookId, options) {
  const bibleId = placeholderVersionId;
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`, options);
}

export function getChapter(query, options) {
  const version = query.version;
  const chapterId = query.chapter_id;
  return fetchFromApi(`https://api.scripture.api.bible/v1/bibles/${version}/chapters/${chapterId}?content-type=json&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false`, options)
}

/**
 * Search for passages
 */
export function getResults(query, options) {

  if (!query.version) return null;
  let searchUrl = `https://api.scripture.api.bible/v1/bibles/${query.version}/search`;

  /* Concatenate search parameters */
  if (query.search)
    searchUrl += `?query=${query.search}`;
  if (query.page) {
    let offset = 0;
    if (query.page >= 1)
      offset = (query.page - 1) * 10;
    // -1 since offset starts counting at 0
    searchUrl += `&offset=${offset}`;
  }
  if (query.sort && ['relevance', 'canonical', 'reverse-canonical'].includes(query.sort))
    searchUrl += `&sort=${query.sort}`;

  return fetchFromApi(searchUrl, options);
}
