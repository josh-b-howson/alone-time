import { Layout } from "../components/layout-components";
import Link from 'next/link';

const Home = (props) => {
  return (
    <Layout>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/versions"><a>All Versions</a></Link>
        </li>
        <li>
          <Link href="/getoneversion"><a>Version By ID</a></Link>
        </li>
        <li>
          <Link href="/books"><a>Books</a></Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home;
