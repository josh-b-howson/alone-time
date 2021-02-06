import Link from "next/link";
import { useSelector } from "react-redux";
import { Layout, LinkItem, LinkList } from "../../components/layout-components";
import { getBookById } from "../../utils/bibleConnector";

const Book = (props) => {
  const queryVersionId = props.query.version;
  const book = props.book;
  return (
    <Layout {...props} title={book.name}>
      <h1>{book.name}</h1>
      <LinkList className="chapter-list">
        {book?.chapters.map(chapter =>
          <LinkItem
            key={chapter.name + chapter.number}
            href={`/chapter/${chapter.id}?version=${queryVersionId}`}>
            {chapter.number}
          </LinkItem>
        )}
      </LinkList>
      <style global jsx>{`
        .chapter-list {max-width:16rem}
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
