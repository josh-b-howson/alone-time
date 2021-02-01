import styles from './SearchBox.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const SearchBox = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('')
  const versionId = useSelector(state => state.version.version);
  const showVersion = () => alert(`${versionId}, ${searchQuery}`);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: 'search/[search]',
      query: {
        search: searchQuery,
        version: versionId,
      }
    });
  }

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <div className={`${styles.input__wrap} input__wrap`}><input className={styles.input} type="text" onChange={handleChange} placeholder="Search" /></div>
      <input className={`${styles.submit} btn btn--primary`} type="submit" value="Search" />
    </form>
  )
}

export default SearchBox;
