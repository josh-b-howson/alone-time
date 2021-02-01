import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVersionId } from '../store/actions/version';
import { getAllVersions, getVersionById } from '../utils/bibleConnector';
import { getFeaturedVersions, limitCharacters } from '../utils/utils';
import { Dropdown } from './layout-components';

const Version = props => {
  const { version, onClick } = props;

  return (
    <div
      key={version.id}
      onClick={() => onClick(version.id)}>
      {limitCharacters(`${version.name} - ${version.abbreviation}`, { limit: 40, ellipsis: true })}
    </div>
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

  return <div>
    <Dropdown
      toggler={currentVersion
        ? currentVersion.abbreviation
        : "Loading..."}>
      {getVersionItems(featuredVersionList)}
      <div><b>ALL:</b></div>
      {getVersionItems(versionList)}
    </Dropdown>
  </div>
}

export default VersionSelect;
