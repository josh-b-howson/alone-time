import Link from "next/link";
import { Layout } from "../../components/layout-components";
import { getAllChapters } from "../../utils/bibleConnector";

const Book = (props) => {
  const chapters = props.chapters;
  return (
    <Layout>
      <h1>{props.bookId}</h1>
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

  const chapters = await getAllChapters(bookId).then(res => res.data).catch(res => console.error(`getVersionsById() failed`));
  return { props: { chapters, bookId } };
}

export default Book;
