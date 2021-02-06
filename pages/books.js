import { useSelector } from 'react-redux';
import { Layout, LinkItem, LinkList } from '../components/layout-components';
import { SVG } from '../components/svg';
import { getAllBooks } from '../utils/bibleConnector';

/**
 * Expected URL:
 * /books?version=${currentVersionId}
 */
const Books = (props) => {
  const currentVersionId = useSelector(state => state.version?.version);
  const books = props.books;
  return (
    <Layout {...props} title="Books List">
      <h1>Books</h1>
      <LinkList className="book-list">
        {books.map(book =>
          <LinkItem
            key={book.id}
            href={`/book/${book.id}?version=${currentVersionId}`}>
            {book.name}
            <SVG className="icon"><path d="M20 56l24-24L20 8" fill='none' stroke-width="8" stroke-miterlimit="4" /></SVG>
          </LinkItem>
        )}
      </LinkList>
      <ul>
      </ul>
      <style jsx>{`
        
      `}</style>
      <style global jsx>{`
        .book-list {max-width:24rem}
        .book-list .icon {height:1.8rem; width:1.8rem; stroke:var(--color-primary-700)}
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const version = ctx.query.version;

  // Make server-side API call
  const res = await getAllBooks(version)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error occured in getAllBooks. ${res.error}`));

  return {
    props: {
      books: res,
    }
  }
}

export default Books;