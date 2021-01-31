import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVersionId } from '../store/actions/version';
import { getAllVersions } from '../utils/bibleConnector';
import { getFeaturedVersions, limitCharacters } from '../utils/utils';
import { Dropdown } from './layout-components';

const Version = (props) => {
  const { version, onClick } = props;

  return (
    <div
      key={version.id}
      onClick={() => onClick(version.id)}>
      {limitCharacters(`${version.name} - ${version.abbreviation}`, { limit: 40, ellipsis: true })}
    </div>
  )
}

const VersionSelect = (props) => {
  const [versionList, setVersionList] = useState(null);
  const [featuredVersionList, setFeaturedVersionList] = useState(null);
  const currentVersion = props.currentVersion;

  // fetch list of versions from API, add to version list state
  async function getVersions(window) {

    const versions = await getAllVersions({ window: window })
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => console.error(`getAllVersions() failed. ${res}`))

    if (versions.length > 0) {
      setVersionList(versions)
      setFeaturedVersionList(getFeaturedVersions(versions));

    }
    else
      console.error("versionList wasn't able to be set. Nothing returned from fetch.")
  }

  const populateVersions = () => {
    // only need to get versions if it hasn't yet been fetched
    if (!versionList)
      getVersions(window)
  }

  useEffect(() => {
    populateVersions();
  }, [])

  const dispatch = useDispatch();
  const setCurrentVersion = (versionId) => {
    dispatch(setVersionId(versionId))
  }

  const getVersionItems = (list) => {
    return list && list.map(version =>
      <Version
        key={version.id}
        version={version}
        onClick={setCurrentVersion} />
    )
  }

return <div>
  <Dropdown toggler={currentVersion && currentVersion.abbreviation}>
    {getVersionItems(featuredVersionList)}
    <div><b>ALL:</b></div>
    {getVersionItems(versionList)}
  </Dropdown>
</div>
}

export default VersionSelect;
