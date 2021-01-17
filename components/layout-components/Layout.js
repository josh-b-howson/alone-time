import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useState } from 'react';
import { LanguageSelect } from '../../components';

const Layout = (props) => {

  const [currentVersion, setCurrentVersion] = useState('hello');

  return (
    <div className="layout">
      <header>
        <Link href="/" prefetch={false}><a>back to home</a></Link>
        <LanguageSelect versions={props.versions} />
        <div>The current version is: {currentVersion}</div>
      </header>
      <ToastContainer />
      {props.children}
    </div>
  )
}

export default Layout;
