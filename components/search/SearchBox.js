import styles from './SearchBox.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const SearchBox = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const versionId = useSelector(state => state.version.version);

  // update the searchQuery state on each keystroke
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  // use the searchQuery state to execute the search
  const handleSubmit = (e) => {
    setIsLoading(true)
    if (!searchQuery) return false;
    // prevent default form action
    e.preventDefault();
    // route to the search page with necessary url params
    router.push({
      pathname: 'search/[search]',
      query: {
        search: searchQuery,
        version: versionId,
      }
    });
  }

  const search = useRef();
  useEffect(() => {
    let searchBoxEmptyMessage = "You need to enter a search query first!";
    search.current.oninvalid = e => {
      console.log(e)
      e.target.setCustomValidity(searchBoxEmptyMessage);
      setIsLoading(false)
    };
  }, [])

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <div className={`${styles.input__wrap} input__wrap`}>
        <input
          ref={search}
          className={styles.input}
          type="text"
          onChange={handleChange}
          placeholder="Search"
          required />
      </div>
      <input
        className={`${styles.submit} btn btn--primary`}
        type="submit"
        value={isLoading ? "Loading..." : "Search"} />
    </form>
  )
}

export default SearchBox;
