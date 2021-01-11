import { Layout } from "../components/layout-components";
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <h1>Home</h1>
      <ul>
        <li>
          <Link href="/versions"><a>Browse Versions</a></Link>
        </li>
        <li>
          <Link href="/books"><a>Books</a></Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Home;
