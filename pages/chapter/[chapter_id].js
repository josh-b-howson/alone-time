import Link from "next/link";
import { Layout } from "../../components/layout-components";
import { BibleContent } from "../../components/read";
import { getChapter } from "../../utils/bibleConnector";

const Read = (props) => {
  const chapter = props.chapter;

  return <Layout {...props} title={`Read ${chapter.reference}`}>
    <h1>{chapter.reference}</h1>
    <main className="read">
      <BibleContent content={chapter.content} />
    </main>
    {chapter.previous && <Link href={`/chapter/${chapter.previous.id}`}><a>Previous Chapter</a></Link>}
    {chapter.next && <Link href={`/chapter/${chapter.next.id}`}><a>Next Chapter</a></Link>}
  </Layout>
}

export async function getServerSideProps(ctx) {
  const query = ctx.query;
  const chapter = await getChapter(query)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error occurred in getChapter(). ${res.error}`));

  return { props: { chapter: chapter } }
}

export default Read;
