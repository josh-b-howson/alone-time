import styles from './Layout.module.scss';
import PropTypes from 'prop-types';
import { Head } from './';

const Layout = (props) => {

  return (
    <>
      <Head {...props} />
      <main className={styles.layout}>
        {props.children}
      </main>
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Layout;
