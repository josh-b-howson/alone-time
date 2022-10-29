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
  const currentPage = Math.ceil(result?.offset / result?.limit) + 1;

  return (
    <Layout {...props} title={`Search for "${searchQuery.search}"`}>
      <h1>Results for "{searchQuery.search}"</h1>
      <p className="results">Results: {result?.total ? result?.total : 'none'}</p>
      {result?.total > 0 ?
        <>
          <ul className="results-list">
            {verses.map(verse => <li key={verse.id}>
              <div className="res-reference">
                <h2>{verse.reference}</h2>
                &nbsp;<Link href={`/chapter/${verse.chapterId}?version=${queryVersionId}`}><a className="read-chapter">Read Chapter&nbsp;&rarr;</a></Link>
              </div>
              <div>{verse.text}</div>
            </li>)}
          </ul>
          {/* <Link href={}></Link> */}
          <ul className="summary">
            <li>Total results: {result?.total}</li>
            <li>Result limit/page: {result?.limit}</li>
            <li>Result offset: {result?.offset}</li>
            <li>Page: {currentPage} of {totalPages}</li>
          </ul>
          <nav>
            {currentPage > 1 &&
              <Link href={`/search/${searchQuery.search}?version=${searchQuery.version}&page=${currentPage - 1}`}><a>Previous page</a></Link>
            }
            {currentPage < totalPages &&
              <Link href={`/search/${searchQuery.search}?version=${searchQuery.version}&page=${currentPage + 1}`}><a>Next page</a></Link>
            }
            {currentPage > totalPages &&
              <>You went too far! <Link href={`/search/${searchQuery.search}?version=${searchQuery.version}&page=${1}`}><a>Back to results</a></Link></>
            }
          </nav>
        </>
        : <div>No Results. Try a new search or switch to a different version.<br /> <Link href='/'><a>Back to home</a></Link></div>}
      <style jsx>{`
        .results {
          margin-block:1em;
        }
        .results-list {
          display: flex;
          flex-flow: column nowrap;
          gap: 1.5rem;
        }
        nav {
          padding: 6rem 0;
          display: flex;
          gap: 2rem;
          justify-content: center;
        }
        .summary {
          margin-block: 1em;
        }
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  const queryVersion = query.version;
  let result = null;

  // only fetch if version passed / page >= 1
  if (queryVersion) {
    result = await getResults(query)
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => console.error(`An error ocurred in getResults(). ${res.error}`));
  }

  return {
    props: {
      searchQuery: query,
      result: result,
    }
  };

}

export default SearchResult;
