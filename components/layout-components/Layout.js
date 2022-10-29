import styles from './Layout.module.scss';
import PropTypes from 'prop-types';
import { Head } from './';
import Link from 'next/link';

const Layout = (props) => {

  return (
    <div
      className={styles.layout}>
      <Head {...props} />
      <header>
        <Link
          href="/">
          <a className="home">Home</a>
        </Link>
      </header>
      <main>
        {props.children}
      </main>
      <footer>
        Josh Howson &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Layout;
