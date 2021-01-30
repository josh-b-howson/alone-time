import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Layout } from "../../components/layout-components";
import { setVersionId } from "../../store/actions/version";
import { getVersionById } from "../../utils/bibleConnector";

const GetOneVersion = (props) => {

  const dispatch = useDispatch()
  const router = useRouter();
  const version = props.version;

  const handleReadNow = () => {
    dispatch(setVersionId(version.id));
    router.push('/books');
  }

  return <Layout {...props} title={`${version.name} Version Information`}>
    <h1>Version</h1>
    <div>
      <h2>{version.name} <sup>{version.abbreviation}</sup></h2>
      <p>ID: {version.id}</p>
      <p>Language: {version.language.name}</p>
      <p>Countries:</p>
      <ul>{version.countries.map(country =>
        <li key={country.id}>{country.name}</li>
      )}</ul>
      <div dangerouslySetInnerHTML={{ __html: version.info }}></div>
      <button onClick={handleReadNow}>Read Now</button>
    </div>
  </Layout>
}

export async function getServerSideProps(ctx) {
  const versionId = ctx.query.version_id;
  const version = await getVersionById(versionId)
    .then(res => res.json())
    .then(json => json.data)
    .catch(res => console.error(`getVersionsById() failed. ${res.error}`));

  return { props: { version: version } };
}

export default GetOneVersion;
