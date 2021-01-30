import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Layout } from '../components/layout-components';
import { getAllBooks } from '../utils/bibleConnector';

const Books = (props) => {
  const currentVersionId = useSelector(state => state.version?.version);
  const books = props.books;
  return (
    <Layout {...props} title="Books List">
      <h1>Books</h1>
      <ul>
        {books.map(book => {
          return <li key={book.id}>{book.name} <Link href={`/book/${book.id}?version=${currentVersionId}`}><a>View</a></Link></li>
        })}
      </ul>
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