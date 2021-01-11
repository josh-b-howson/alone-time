import { getAllVersions } from "../utils/bibleConnector";
import { Layout } from '../components/layout-components';
import Link from 'next/link';

const Versions = (props) => {

  return (
    <Layout>
      <h1>Bible Versions</h1>
      <ul>
        {props?.versionsResponse.map(version =>
          <li key={version.id}>{version.name} <Link href={`/version/${version.id}`}><a>View</a></Link></li>
        )}
      </ul>
    </Layout>
  )
}

// This gets called on every request
export const getServerSideProps = async () => {
  const res = await getAllVersions().then(res => res.data);

  return {
    props:
    {
      versionsResponse: res
    }
  }
}

export default Versions;
