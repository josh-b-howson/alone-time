import Link from "next/link";
import { Layout } from "../../components/layout-components";
import { getAllChapters, getBookById } from "../../utils/bibleConnector";

const Book = (props) => {
  const book = props.book;
  const chapters = props.chapters;
  return (
    <Layout>
      <h1>{book.name}</h1>
      <ul>
        {book?.chapters.map(chapter => {
          return <li><Link href={"/"}><a>{chapter.number}</a></Link></li>
        })}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const bookId = ctx.query.book_id;

  const book = await getBookById(bookId, true).then(res => res.data).catch(res => console.error(`getBookById() failed`));
  return { props: { book } };
}

export default Book;
