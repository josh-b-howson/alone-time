import { getBibleApiKey } from "../utils/utils";
import { XMLHttpRequest } from 'xhr2';

const API_KEY = getBibleApiKey();
/**
 * Get passage
 */

/**
 * Get books list
 */
export function getBooks(bibleVersionID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const { data } = JSON.parse(this.responseText);
        const books = data.map(({ name, id }) => {
          return { name, id };
        });

        resolve(books);
      }
    });

    xhr.open(
      `GET`,
      `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/books`,
    );

    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

/**
 * Get chapters list
 */

/**
 * Get versions 
 */
export function getVersions() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function () {
      if (this.readyState === this.DONE) {
        const { data } = JSON.parse(this.responseText);
        const versions = data.map((data) => {
          return {
            name: data.name,
            id: data.id,
            abbreviation: data.abbreviation,
            description: data.description,
            language: data.language,
          };
        });

        resolve(versions);
      }
    });
    
    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}
