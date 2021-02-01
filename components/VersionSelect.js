import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVersionId } from '../store/actions/version';
import { getAllVersions, getVersionById } from '../utils/bibleConnector';
import { getFeaturedVersions, limitCharacters } from '../utils/utils';
import { Dropdown } from './layout-components';
import styles from './VersionSelect.module.scss';

const Version = props => {
  const { version, onClick } = props;

  return (
    <li
      tabIndex="0"
      key={version.id}
      onClick={() => onClick(version.id)}
      onKeyUp={e => e.key === "Enter" && onClick(version.id)}
    >
      <span className={styles.versionName}>{version.name}</span>&nbsp;<span className={styles.versionAbbrev}>({version.abbreviation})</span>
    </li>
  )
}

const VersionSelect = props => {
  const [versionList, setVersionList] = useState(null);
  const [featuredVersionList, setFeaturedVersionList] = useState(null);
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

  // fetch list of versions from API, add to version list state
  async function getVersions(window) {

    const versions = await getAllVersions({ window: window })
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => console.error(`getAllVersions() failed. ${res}`))

    if (versions.length > 0) {
      setVersionList(versions)
      setFeaturedVersionList(getFeaturedVersions(versions));
    } else
      console.error("versionList wasn't able to be set. Nothing returned from fetch.");
  }

  const populateVersions = () => {
    // only need to get versions if it hasn't yet been fetched
    if (!versionList)
      getVersions(window)
  }

  useEffect(() => {
    populateVersions();
    // if redux version is not set, update the current version with cookie value
    if (!versionIdFromRedux && props.versionIdFromCookie)
      updateCurrentVersion(props.versionIdFromCookie);
  }, [])

  const setCurrentVersionId = (versionId) => {
    dispatch(setVersionId(versionId))
  }

  const getVersionItems = (list) => {
    return list && list.map(version =>
      <Version
        key={version.id}
        version={version}
        onClick={setCurrentVersionId} />
    )
  }
  const Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><path fillRule="evenodd" clipRule="evenodd" d="M56.55 11.46A32.44 32.44 0 0047 10.11c-5.05 0-10.47.97-14.39 3.62a1.1 1.1 0 01-1.22 0c-3.92-2.65-9.34-3.62-14.39-3.62-5.14 0-10.66 1-14.6 3.76a.96.96 0 00-.4.8V53.8c0 .68.68 1.35 1.36 1.35.14 0 .24-.03.34-.06l.12-.04.12-.03c.1-.02.21-.05.31-.1A33.6 33.6 0 0117 52.04c5.07 0 10.52.99 14.44 3.66.34.23.79.26 1.15.05 3.77-2.12 10.01-3.7 14.41-3.7 4.5 0 9.14.8 12.95 2.83.28.14.41.14.69.14.68 0 1.36-.68 1.36-1.35v-39a.96.96 0 00-.4-.8 19.18 19.18 0 00-5.05-2.4zM41.3 35.6v.03h.02l2.22 3.27c.17.24.54.24.7 0l4.36-6.4a.42.42 0 00-.36-.65H46a13.52 13.52 0 00-13.55-12.6c-3.47 0-6.63 1.28-9.03 3.4a.4.4 0 00-.06.53l1.91 2.81c.16.23.48.25.68.06a9.36 9.36 0 016.5-2.6 9.3 9.3 0 019.3 8.4h-2.2a.42.42 0 00-.34.66l2.1 3.1zm-1.9 3.24c.2-.21.55-.2.7.04l1.94 2.84a.4.4 0 01-.05.52 13.61 13.61 0 01-9.55 3.9c-7.5 0-13.58-6.02-13.58-13.45h-2.23a.42.42 0 01-.35-.65l4.35-6.4a.43.43 0 01.7 0l4.35 6.4a.42.42 0 01-.35.65H23.1c0 5.1 4.18 9.24 9.34 9.24 2.77 0 5.26-1.2 6.97-3.09z" /></svg>

  return <div className={styles.versionSelect}>
    <Dropdown
      contentTag="ul"
      togglerClassName={`${styles.toggler} btn btn--sm btn--bar`}
      contentClassName={styles.dropdown}
      toggler={<>
        {currentVersion
          ? <span>{currentVersion.abbreviation}</span>
          : <span className="load--spin"></span>}
        <Icon />
      </>}>
      <div className={styles.header}>
        <Icon />
        <h4>Change Current Version</h4>
      </div>
      <div className={styles.content} tabIndex="-1">
        {getVersionItems(featuredVersionList)}
        <div><b>ALL:</b></div>
        {getVersionItems(versionList)}
      </div>
    </Dropdown>
  </div >
}

export default VersionSelect;
