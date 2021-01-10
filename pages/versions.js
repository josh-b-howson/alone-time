import { getVersions } from "../utils/bibleConnector";

const Versions = (props) => {

  const VersionCard = (props) => {
    const version = props.version;
    return (
      <li className="version-card">
        <h3>{version.name}</h3>
        <div><span className="label">Id:</span>{version.id}</div>
        <div><span className="label">Abbreviation:</span>{version.abbreviation}</div>
        <div><span className="label">Language:</span>{version.language.name}</div>
        <div><span className="label">Description:</span>{version.description}</div>
        <style jsx>{`
          .version-card {
            background-color: #f6f6f6;
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 6px;
            flex-grow: 1;
            flex-shrink: 0;
          }
          .version-card h3 {
            margin: 0 0 .5rem 0;
          }
          .version-card .label {
            text-transform: uppercase;
            color: #777;
            font-weight: 700;
            font-size: 13px;
          }
          .version-card .label::after {content: ' '}
        `}</style>
      </li>
    )
  }
  return (
    <section className="versions">
      <h1>Bible Versions</h1>
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
          flex-direction:column;
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

export default Versions;
