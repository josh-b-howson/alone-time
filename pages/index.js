import { Layout } from "../components/layout-components";
import Link from 'next/link';
import { useSelector } from "react-redux";

const Home = (versions) => {

  const currentVersionId = useSelector(state => state.version?.version);
  return (
    <Layout {...versions} title="Home">
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/search"><a>Search</a></Link>
        </li>
        <li>
          <Link href="/versions"><a>Browse Versions</a></Link>
        </li>
        <li>
          <Link href={`/books?version=${currentVersionId}`}><a>Read</a></Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home;
