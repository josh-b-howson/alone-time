import { Layout } from "../components/layout-components";
import { VersionSelect } from "../components";
import { SearchBox } from '../components/search';
import Link from "next/link";
import { useSelector } from "react-redux";

const Home = (props) => {
  const currentVersionId = useSelector(state => state.version.version);

  return (
    <Layout title="Home">
      <h1>Find Something</h1>
      <VersionSelect {...props} />
      <SearchBox />
      Or <Link href={`/books?version=${currentVersionId}`}><a>Choose a Book</a></Link>
    </Layout>
  )
}

export default Home;
