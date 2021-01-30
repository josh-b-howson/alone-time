import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { VersionSelect } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVersionById } from '../../utils/bibleConnector';
import { setVersionId } from '../../store/actions/version';
import Head from 'next/head';
import PropTypes from 'prop-types';

const Layout = (props) => {
  const dispatch = useDispatch();
  // entire version object from API
  const [currentVersion, setCurrentVersion] = useState();

  const versionIdFromRedux = useSelector(state => state.version.version);

  /* fetches the current version object from the API, adds to currentVersion state */
  async function updateCurrentVersion(id) {
    // don't call api if no id is passed
    if (!id) return;
    const res = await getVersionById(id, { window: window })
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => res.error);
    setCurrentVersion(res);
    dispatch(setVersionId(res.id))
  }

  // update the redux state on first load & when versionId changes
  useEffect(() => {
    // update version state with redux id if set, otherwise use cookie
    updateCurrentVersion(versionIdFromRedux ? versionIdFromRedux : props.versionIdFromCookie)
  }, [versionIdFromRedux]);

  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{props.title} &ndash; Alone Time</title>
      </Head>
      <div className="layout">
        <header>
          <div><small>*Note* Currently only the search page works with your selected version. And even there you need to go back to the search page to update your version.</small></div>
          <Link href="/" prefetch={false}><a>back to home</a></Link>
          <VersionSelect currentVersion={currentVersion} />
          <div>Version: <b>{currentVersion ? currentVersion?.name : 'No version selected'}</b></div>
        </header>
        <ToastContainer />
        {props.children}
      </div>
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Layout;
