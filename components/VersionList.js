import React, { useState } from 'react';
import Versions from '../configs/utils/Versions';
import { getVersions } from '../utils/bibleConnector.js';
import { useEffect } from 'react';

const VersionList = (props) => {
  const versionsResponse = getVersions();
  const versions = new Versions(versionsResponse);
  const [versionList, setVersionList] = useState([]);
  console.log(versionsResponse);

  useEffect(() => {
    setVersionList(versions.getAllVersions());
  }, []);

  return <>
    {versionList.map(
      version => {
        console.log('yeyeye');
        return <h6>{version.name}</h6>
      }
    )}
  </>
}

export default VersionList;
