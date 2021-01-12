import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setVersion } from '../../store/actions/version';
import { useState } from 'react';

const Layout = (props) => {
  const LanguageSelect = (props) => {
    const dispatch = useDispatch();
    const versions = props.versions;

    const handleChange = (e) => {
      dispatch(setVersion(e.target.value))
    }

    return <select onChange={handleChange}>
      <option value="none">Choose a version</option>
      {versions && versions.map(version => <option value={version.id}>{version.name} - {version.abbreviation}</option>)}
    </select>
  }

  const [currentVersion, setCurrentVersion] = useState('hello');

  return (
    <div className="layout">
      <header>
        <Link href="/"><a>back to home</a></Link>
        <LanguageSelect versions={props.versions} />
        <div>The current version is: {currentVersion}</div>
      </header>
      <ToastContainer />
      {props.children}
    </div>
  )
}

export default Layout;