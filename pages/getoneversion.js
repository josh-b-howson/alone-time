import { Layout } from "../components/layout-components"
import { getVersionById } from "../utils/bibleConnector"

const GetOneVersion = (props) => {
  console.log(props);
  return <Layout>
    <h1>Get One Version</h1>
  </Layout>
}

export async function getServerSideProps() {
  const res = await getVersionById('f72b840c855f362c-04').then(res => res.data).catch(res => console.err(`FAILURE. ${res.data}`));

  return {
    props: {
      oneVersion: res,
    }
  };
}

export default GetOneVersion;
