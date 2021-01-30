import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVersionId } from '../store/actions/version';
import { getAllVersions } from '../utils/bibleConnector';
import { getFeaturedVersions, limitCharacters } from '../utils/utils';

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
  const handleChange = (e) => {
    dispatch(setVersionId(e.target.value))
  }

  return <div>
    <select onChange={handleChange}>
      <option value="none">Choose a version</option>
      {featuredVersionList &&
        <optgroup label="Featured">
          {featuredVersionList.map(version =>
            <option
              key={version.id}
              value={version.id}>
              {limitCharacters(`${version.name} - ${version.abbreviation}`, { limit: 40, ellipsis: true })}
            </option>)}
        </optgroup>}
      {versionList &&
        <optgroup label="All">
          {versionList.map(version =>
            <option
              key={version.id}
              value={version.id}
              selected={currentVersion && version.id === currentVersion.id ? 'selected' : ''}>
              {limitCharacters(`${version.name} - ${version.abbreviation}`, { limit: 40, ellipsis: true })}
            </option>)}
        </optgroup>
      }
    </select>
  </div>
}

export default VersionSelect;
