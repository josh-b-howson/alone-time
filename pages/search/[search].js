import Link from "next/link";
import { Layout } from "../../components/layout-components"
import { getResults } from "../../utils/bibleConnector";

const SearchResult = (props) => {
  const result = props?.result;
  const verses = result?.verses;
  const searchQuery = props.searchQuery;
  const queryVersionId = searchQuery.version;

  // pagination
  const totalPages = Math.ceil(result?.total / result?.limit)
  const currentPage = result?.offset + 1;

  return (
    <Layout {...props} title={`Search for "${searchQuery.search}"`}>
      <h1>Results for "{searchQuery.search}"</h1>
      <p>Results: {result?.total ? result?.total : 'none'}</p>
      {verses?.length > 0 ?
        <>
          <ul>
            {verses.map(verse => <li key={verse.id}>
              <div>
                {verse.reference}
                <Link href={`/chapter/${verse.chapterId}?version=${queryVersionId}`}><a>Read Chapter</a></Link>
              </div>
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
        : <div>No Results. Try a new search or switch to a different version.<br /> <Link href='/'><a>Back to home</a></Link><Link href='/search'><a>Back to search</a></Link></div>}
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
    return {
      props: {
        searchQuery: query,
        result: result,
      }
    };
  }
}

export default SearchResult;
