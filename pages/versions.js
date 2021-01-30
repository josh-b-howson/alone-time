import { getAllVersions } from "../utils/bibleConnector";
import { Layout } from '../components/layout-components';
import Link from 'next/link';

const Versions = (props) => {

  const versions = props.versions;

  return (
    <Layout {...props} title="Bible Versions">
      <h1>Bible Versions</h1>
      <ul>
        {versions && versions.map(version =>
          <li key={version.id}>{version.name} <Link href={`/version/${version.id}`}><a>View</a></Link></li>
        )}
      </ul>
    </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  const versionsList = await getAllVersions()
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`An error ocurred in getAllVersions(). ${res.error}`))

  return { props: { versions: versionsList } }
}

export default Versions;
