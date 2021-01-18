import Link from "next/link";
import { Layout } from "../../components/layout-components";
import { getBookById } from "../../utils/bibleConnector";

const Book = (props) => {
  const book = props.book;
  const chapters = props.chapters;
  return (
    <Layout {...props}>
      <h1>{book.name}</h1>
      <ul>
        {book?.chapters.map(chapter => {
          return <li key={chapter.name + chapter.number}><Link href={`/chapter/${chapter.id}`}><a>{chapter.number}</a></Link></li>
        })}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const bookId = ctx.query.book_id;

  const book = await getBookById(bookId, true)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error ocurred in getBookById(). ${res.error}`));
  return { props: { book } };
}

export default Book;
