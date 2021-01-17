import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVersion } from '../store/actions/version';
import { getAllVersions } from '../utils/bibleConnector';
import { limitCharacters } from '../utils/utils';

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
      console.error("versionList wasn't able to be set. Nothing returned from fetch.")
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

  return <div>
    <select onChange={handleChange} onClick={e => handleClick(window)}>
      <option value="none">Choose a version</option>
      {versionList && versionList.map(version =>
        <option
          key={version.id}
          value={version.id}>
          {limitCharacters(version.name, { limit: 40, ellipsis: true })}
        </option>
      )}
    </select>
  </div>
}

export default LanguageSelect;
