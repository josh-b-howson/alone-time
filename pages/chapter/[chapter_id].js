import Link from "next/link";
import { Layout } from "../../components/layout-components";
import { getChapter } from "../../utils/bibleConnector";

const Chapter = (props) => {
  const chapter = props.chapter;

  const renderContentFromJson = (content) => {
    return <>
      {content.map((item, index) =>
        <span
          key={index}
          className={item?.attrs?.style}>
          {item?.text}
          {item.items && renderContentFromJson(item.items)}
        </span>
      )}
    </>
  }

  return <Layout {...props}>
    <h1>{chapter.reference}</h1>
    <main>
      {renderContentFromJson(chapter.content)}
    </main>
    <Link href={`/chapter/${chapter.previous.id}`}><a>Previous Chapter</a></Link>
    <Link href={`/chapter/${chapter.next.id}`}><a>Next Chapter</a></Link>
    <style global jsx>{`
      .p {
        display:block;
        line-height:1.5;
      }
      .v {
        font-size:smaller;
      }
    `}</style>
  </Layout>
}

export async function getServerSideProps(ctx) {
  const chapter = await getChapter(ctx.query)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error occurred in getChapter(). ${res.error}`));

  return { props: { chapter: chapter } }
}

export default Chapter;
