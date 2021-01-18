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
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} placeholder="Search" />
      <input type="submit" value="Search" />
    </form>
  )
}

export default SearchBox;
