import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVersion } from '../store/actions/version';
import { getAllVersions } from '../utils/bibleConnector';

const LanguageSelect = (props) => {
  const [versionList, setVersionList] = useState(null);

  async function getVersions(window) {

    const versions = await getAllVersions({ window: window })
      .then(res => res.json())
      .then(json => json.data)
      .catch(res => console.error(`getAllVersions() failed. ${res}`))



    if (versions.length > 0)
      setVersionList(versions)
    else
      console.error("Version List wasn't able to be set. Nothing returned from fetch.")
  }

  const handleClick = (window) => {

    // only need to get versions if it hasn't yet been fetched
    if (!versionList)
      getVersions(window)
  }

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setVersion(e.target.value))
  }

  return <select onChange={handleChange} onClick={e => handleClick(window)}>
    <option value="none">Choose a version</option>
    {versionList && versionList.map(version => <option key={version.id} value={version.id}>{version.name}</option>)}
  </select>
}

export default LanguageSelect;
