import { Layout, LinkItem, LinkList } from '../components/layout-components';
import { SVG } from '../components/svg';
import { getAllBooks } from '../utils/bibleConnector';

/**
 * Expected URL:
 * /books?version=${currentVersionId}
 */
const Books = (props) => {
  // links use the version passed in as url param, since that doesn't change
  const queryVersionId = props.query.version;
  const books = props.books;
  return (
    <Layout {...props} title="Books List">
      <h1>Books</h1>
      <LinkList className="book-list">
        {books.map(book =>
          <LinkItem
            key={book.id}
            href={`/book/${book.id}?version=${queryVersionId}`}>
            {book.name}
            <SVG svgId="arrow-right" className="icon" />
          </LinkItem>
        )}
      </LinkList>
      <style global jsx>{`
        .book-list {max-width:24rem}
        .book-list .icon {flex-shrink:0; height:1.8rem; width:1.8rem; stroke:var(--color-primary-700)}
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  const version = query.version;

  // Make server-side API call
  const res = await getAllBooks(version)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error occured in getAllBooks. ${res.error}`));

  return {
    props: {
      books: res,
      query: query,
    }
  }
}

export default Books;