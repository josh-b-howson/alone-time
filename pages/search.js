import { Layout } from "../components/layout-components";
import { SearchBox } from "../components/search";

const Search = (props) => {

  return (
    <Layout {...props} title="Search the Bible">
      <h1>Search</h1>
      <SearchBox />
    </Layout>
  )
}

export default Search;
