import { useSelector } from "react-redux";
import { Layout } from "../components/layout-components";

const AnotherPage = () => {
  const currentVersion = useSelector(state => state.version);
  console.log("now we're on a new page")
  console.log(currentVersion)
  return (
    <Layout>
      <h1>Welcome to another page!</h1>
      <p>The current version is: <b>{currentVersion?.version?.name}</b></p>
    </Layout>
  )
}

export default AnotherPage;
