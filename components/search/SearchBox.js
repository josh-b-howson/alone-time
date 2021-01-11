import { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBox = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    router.push(`/search/${searchQuery}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} placeholder="Search" />
      <button role="submit">Search</button>
    </form>
  )
}

export default SearchBox;