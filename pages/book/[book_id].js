import Link from "next/link";
import { useSelector } from "react-redux";
import { Layout } from "../../components/layout-components";
import { getBookById } from "../../utils/bibleConnector";

const Book = (props) => {
  const currentVersionId = useSelector(state => state.version?.version);
  const book = props.book;
  return (
    <Layout {...props} title={book.name}>
      <h1>{book.name}</h1>
      <ul>
        {book?.chapters.map(chapter => {
          return <li key={chapter.name + chapter.number}><Link href={`/chapter/${chapter.id}?version=${currentVersionId}`}><a>{chapter.number}</a></Link></li>
        })}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const version = ctx.query.version;
  const bookId = ctx.query.book_id;

  const book = await getBookById(bookId, version, true)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error ocurred in getBookById(). ${res.error}`));
  return { props: { book } };
}

export default Book;
