import { Layout } from "../../components/layout-components";
import { getVersionById } from "../../utils/bibleConnector";

const GetOneVersion = (props) => {

  const version = props.version;

  return <Layout {...props}>
    <h1>Get One Version</h1>
    <div>
      <h2>{version.name} <sup>{version.abbreviation}</sup></h2>
      <p>ID: {version.id}</p>
      <p>Language: {version.language.name}</p>
      <div dangerouslySetInnerHTML={{ __html: version.info }}></div>

    </div>
  </Layout>
}

export async function getServerSideProps(ctx) {
  console.log(ctx.query)
  const versionId = ctx.query.version_id;
  const version = await getVersionById(versionId)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`getVersionsById() failed. ${res.error}`));

  return { props: { version: version } };
}

export default GetOneVersion;
