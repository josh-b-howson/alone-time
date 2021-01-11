import Link from "next/link";
import { Layout } from "../../components/layout-components"
import { getResults } from "../../utils/bibleConnector";

const SearchResult = (props) => {
  const result = props.result;
  const verses = result.verses;
  return (
    <Layout {...props}>
      <h1>Search Results</h1>
      {verses?.length > 0 ? 
      <ul>
        {verses.map(verse => <li key={verse.id}>
          <div>{verse.reference}</div>
          <div>{verse.text}</div>
          </li>)}
      </ul>
        : <div>No Results. <Link href='/'><a>Back to home</a></Link></div>}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const searchQuery = ctx.query.search;

  const result = await getResults(searchQuery).then(res => res.data).catch(console.error(`getResults() failed`));
  return { props: { result } };
}

export default SearchResult;