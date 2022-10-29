import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVersionId } from '../store/actions/version';
import { getAllVersions, getVersionById } from '../utils/bibleConnector';
import { getFeaturedVersions, limitCharacters } from '../utils/utils';
import { Dropdown } from './layout-components';
import SVG from './svg/SVG';
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
    updateCurrentVersion(versionIdFromRedux
      // update version state with redux id if set, otherwise use cookie
      //  ? versionIdFromRedux : props.versionIdFromCookie
    )
  }, [versionIdFromRedux]);

  // fetch list of versions from API, add to version list state
  async function getVersions(window) {

    const versions = await getAllVersions({ window: window })
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => console.error(`getAllVersions() failed. ${res}`))

    if (versions && versions.length > 0) {
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
    // if (!versionIdFromRedux && props.versionIdFromCookie)
    //   updateCurrentVersion(props.versionIdFromCookie);
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

  // used in both the toggler and the content
  const Icon = () => <SVG svgId="version-select" />

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
      <ul className={styles.content} tabIndex="-1">
        <li><b>Recommended:</b></li>
        {getVersionItems(featuredVersionList)}
        <li><b>ALL:</b></li>
        {getVersionItems(versionList)}
      </ul>
    </Dropdown>
  </div >
}

export default VersionSelect;
