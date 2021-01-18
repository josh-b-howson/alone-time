import Link from "next/link";
import { Layout } from "../../components/layout-components"
import { getResults } from "../../utils/bibleConnector";

const SearchResult = (props) => {
  const result = props?.result;
  const verses = result?.verses;

  // pagination
  const totalPages = Math.ceil(result?.total / result?.limit)
  const currentPage = result?.offset + 1;

  return (
    <Layout {...props}>
      <h1>Search Results</h1>
      <p>Results: {result?.total}</p>
      {verses?.length > 0 ?
        <>
          <ul>
            {verses.map(verse => <li key={verse.id}>
              <div>{verse.reference}</div>
              <div>{verse.text}</div>
            </li>)}
          </ul>
          {/* <Link href={}></Link> */}
          <ul>
            <li>Total results: {result?.total}</li>
            <li>Result limit/page: {result?.limit}</li>
            <li>Page offset: {result?.offset}</li>
            <li>Page: {currentPage} of {totalPages}</li>
          </ul>
        </>
        : <div>No Results. <Link href='/'><a>Back to home</a></Link></div>}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  const queryVersion = query.version;

  if (!queryVersion) {
    return { props: { result: null } };
  } else {
    const result = await getResults(query)
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => console.error(`An error ocurred in getResults(). ${res.error}`));
    return { props: { result: result } };
  }
}

export default SearchResult;