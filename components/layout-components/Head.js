import Head from 'next/head';

const HeadComponent = (props) => {
  return (
    <Head>
      <link key="faviconSVG" rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <title key="pageTitle">{props.title} &ndash; Alone Time</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&family=Heebo:wght@400;500&display=swap" rel="stylesheet" />
    </Head>
  )
}
export default HeadComponent;
