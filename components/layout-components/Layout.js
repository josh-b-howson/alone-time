import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { LanguageSelect } from '../../components';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVersionById } from '../../utils/bibleConnector';

const Layout = (props) => {

  const versionId = useSelector(state => state.version.version)
  const [currentVersion, setCurrentVersion] = useState(null)

  useEffect(() => {
    async function getCurrentVersionById(window) {
      const res = await getVersionById(versionId, { window: window })
        .then(res => res.json())
        .then(json => json.data)
        .catch(res => res.error);
      setCurrentVersion(res);
    }
    getCurrentVersionById();
  }, [versionId]);

  return (
    <div className="layout">
      <header>
        <Link href="/" prefetch={false}><a>back to home</a></Link>
        <LanguageSelect versions={props.versions} />
        <div>The current version is: {currentVersion?.name}</div>
      </header>
      <ToastContainer />
      {props.children}
    </div>
  )
}

export default Layout;
