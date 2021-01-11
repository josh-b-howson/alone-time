import { getBibleApiKey } from "../utils/utils";
import { XMLHttpRequest } from 'xhr2';

const API_KEY = getBibleApiKey();
const placeholderVersionId = '6bab4d6c61b31b80-01';

const callBibleAPI = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open(method, url);

    xhr.responseType = 'json';
    xhr.setRequestHeader(`api-key`, API_KEY);

    if (data) {
      xhr.setRequestHeader(`Content-Type`, `application/json`);
    }

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong.");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

/**
 * Get versions 
 */
export function getAllVersions() {
  return callBibleAPI(`GET`, `https://api.scripture.api.bible/v1/bibles`);
}

/**
 * Get version by ID
 */
export function getVersionById(id) {
  return callBibleAPI(`GET`, `https://api.scripture.api.bible/v1/bibles/${id}`);
}

/**
 * Get books list
 */
export function getAllBooks(id) {
  return callBibleAPI(`GET`, `https://api.scripture.api.bible/v1/bibles/${id}/books`);
}

/**
 * Get chapters in a book
 */
export function getBookById(bookId) {
  const bibleId = placeholderVersionId;
  return callBibleAPI(`GET`, `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}`);
}

/**
 * Get chapters in a book
 */
export function getAllChapters(bookId) {
  const bibleId = placeholderVersionId;
  return callBibleAPI(`GET`, `https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`);
}

