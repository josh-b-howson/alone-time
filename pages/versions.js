import { toast } from "react-toastify"
import { getAllVersions, getVersionById } from "../utils/bibleConnector"
import { Layout } from '../components/layout-components'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react"

const Versions = (props) => {

  return (
    <Layout>
      <h1>Bible Versions</h1>
      <ul>
        {props?.versionsResponse.map(version =>
          <li>{version.name}</li>
        )}
      </ul>
    </Layout>
  )
}

// This gets called on every request
export const getServerSideProps = async () => {
  const res = await getAllVersions().then(res => res.data);

  return {
    props:
    {
      versionsResponse: res
    }
  }
}

export default Versions;
