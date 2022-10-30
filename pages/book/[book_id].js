import Link from "next/link";
import { Layout, LinkItem, LinkList } from "../../components/layout-components";
import { getBookById } from "../../utils/bibleConnector";

const Book = (props) => {
  const queryVersionId = props.query.version;
  const book = props.book;
  // chapter label shows normally if it's a number, else truncates to prevent overflowing its container
  const getChapterLabel = (chapter) => isNaN(chapter.number)
    ? chapter.number.substring(0, 3)
    : chapter.number;
  return (
    <Layout
      {...props}
      title={book.name}>
      <Link
        href={`/books?version=${queryVersionId}`}
        className="books">
        &larr;&nbsp;Books
      </Link>
      <h1>{book.name}</h1>
      <h4>Chapters</h4>
      <LinkList
        className="chapter-list"
        display="wrapped">
        {book?.chapters.map(chapter =>
          <LinkItem
            key={chapter.id}
            href={`/chapter/${chapter.id}?version=${queryVersionId}`}>
            {getChapterLabel(chapter)}
          </LinkItem>
        )}
      </LinkList>
      <style global jsx>{`
        .books {margin-block:1em}
        .chapter-list {text-transform:uppercase}
      `}</style>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  const version = ctx.query.version;
  const bookId = ctx.query.book_id;

  const book = await getBookById(bookId, version, true)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error ocurred in getBookById(). ${res.error}`));
  return { props: { book: book, query: query } };
}

export default Book;
