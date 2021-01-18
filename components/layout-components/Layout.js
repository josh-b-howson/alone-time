import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { VersionSelect } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVersionById } from '../../utils/bibleConnector';
import { setVersionId } from '../../store/actions/version';


const Layout = (props) => {

  const dispatch = useDispatch();
  // entire version object from API
  const [currentVersion, setCurrentVersion] = useState();

  const versionIdFromRedux = useSelector(state => state.version.version);

  /* fetches the current version object from the API, adds to currentVersion state */
  async function updateCurrentVersion(id) {
    const res = await getVersionById(id, { window: window })
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => res.error);
    setCurrentVersion(res);
    dispatch(setVersionId(res.id))
  }

  // if current version is not yet set and cookie is present, set current state
  if (currentVersion && props.currentVersionFromCookie)
    updateCurrentVersion(props.currentVersionFromCookie.id)

  // update the redux state on first load & when versionId changes
  useEffect(() => {
    // update version state with redux id if set, otherwise use cookie
    updateCurrentVersion(versionIdFromRedux ? versionIdFromRedux : props.versionIdFromCookie)
  }, [versionIdFromRedux]);

  return (
    <div className="layout">
      <header>
        <Link href="/" prefetch={false}><a>back to home</a></Link>
        <VersionSelect currentVersion={currentVersion} />
        <div>The current version is: {currentVersion ? currentVersion?.name : 'No version selected'}</div>
      </header>
      <ToastContainer />
      {props.children}
    </div>
  )
}

export default Layout;
