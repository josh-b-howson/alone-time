import Versions from "../configs/utils/Versions";
import { getVersions } from "../utils/bibleConnector";

const TestPage = (props) => {
  console.log(props);
  // Render data...

  const VersionCard = (props) => {
    const version = props.version;
    return (
      <li className="version-card">
        <h4>Name: {version.name}</h4>
        <div>Id: {version.id}</div>
        <div>Abbreviation: {version.abbreviation}</div>
        <div>Language: {version.language.name}</div>
        <div>Description: {version.description}</div>
        <style jsx>{`
          .version-card {
            background-color: #f6f6f6;
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 6px;
            flex-basis: 219px;
            flex-grow: 1;
            flex-shrink: 0;
          }
          .version-card h4 {
            margin: 0 0 .5rem 0;
          }
        `}</style>
      </li>
    )
  }
  return (
    <section className="versions">
      <h1>Hello World</h1>
      <ul className="version-list">
        {props?.versionsResponse.map(version =>
          <VersionCard version={version} />
        )}
      </ul>
      <style jsx>{`
        .versions {
          margin: 1rem;
        }
        .version-list {
          display: flex;
          list-style: none;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </section>
  )
}

// This gets called on every request
export const getServerSideProps = async () => {
  // Fetch data from external API
  const versionsResponse = await getVersions();
  // const versions = new Versions(versionsResponse);
  // setTimeout(() => console.log(versions), 4000);

  // Pass data to the page via props
  return { props: { versionsResponse: versionsResponse } }
}

export default TestPage;
