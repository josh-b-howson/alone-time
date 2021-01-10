/**
* A wrapper class for Versions objects.
*/
export default class Versions {

  /**
   * Constructor  
   * @param {response object} response - Response from bibleConnector.getVersions()
   */
  constructor(response) {
    this.init(response)
  }

  init(response) {
    this.versions = [];
    response.then((versions) => {
      for (let version of versions) {
        this.versions.push(version);
      }
    })
  }

  getAllVersions() {
    return this.versions;
  }
}
