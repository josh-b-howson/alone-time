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
        {chapters.map(chapter => {
          return <li><Link href={"/"}><a>{chapter.number}</a></Link></li>
        })}
      </ul>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const bookId = ctx.query.book_id;

  const book = await getBookById(bookId).then(res => res.data).catch(res => console.error(`getBookById() failed`));

  const chapters = await getAllChapters(bookId).then(res => res.data).catch(res => console.error(`getAllChapters() failed`));
  return { props: { chapters, bookId, book } };
}

export default Book;
