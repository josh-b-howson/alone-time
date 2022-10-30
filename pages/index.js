import { Layout } from "../components/layout-components";
import { VersionSelect } from "../components";
import { SearchBox } from '../components/search';
import Link from "next/link";
import { useSelector } from "react-redux";

const Home = (props) => {
  const currentVersionId = useSelector(state => state.version.version);

  return (
    <Layout title="Home">
      <div className="home__title">
        <h1>Find Something</h1>
        <VersionSelect {...props} />
      </div>
      <div className="home__search">
        <SearchBox />
      </div>
      <div className="home__books">
        Or <Link href={`/books?version=${currentVersionId}`}>Choose a Book</Link>
      </div>
      <style jsx>{`
        .home__title {display:flex; flex-wrap:nowrap; align-items:center; justify-content:flex-start; gap:1rem; margin-top:1.5rem}
        .home__title h1 {color:var(--color-text-dark)}
        .home__search {margin-top:.8rem}
        .home__books {margin-top:2rem}
      `}</style>
    </Layout>
  )
}

export default Home;
