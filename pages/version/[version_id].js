import { Layout } from "../../components/layout-components";
import { getVersionById } from "../../utils/bibleConnector";

const GetOneVersion = (props) => {

  const version = props.version;

  return <Layout>
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
  const version = await getVersionById(ctx.query.version_id).then(res => res.data).catch(res => console.err(`getVersionsById() failed`));

  return { props: { version } };
}

export default GetOneVersion;
