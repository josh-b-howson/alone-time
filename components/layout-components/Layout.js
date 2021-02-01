import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { VersionSelect } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getVersionById } from '../../utils/bibleConnector';
import { setVersionId } from '../../store/actions/version';
import PropTypes from 'prop-types';
import { Head } from './';

const Layout = (props) => {

  return (
    <>
      <Head {...props} />
      <main className="layout">
        {props.children}
      </main>
    </>
  )
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Layout;
