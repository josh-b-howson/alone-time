import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { initializeStore } from '../store/store';
import dookie from '../utils/dookie';
import { getVersionById } from '../utils/bibleConnector';

const App = ({ Component, pageProps }) => {

  const store = initializeStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

App.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const { currentVersionId } = dookie.get(ctx);
  // console.log(`ID: ${currentVersionId}`);
  // const currentVersion = await getVersionById(currentVersionId)
  //   .then(res => res.json())
  //   .then(json => json.data)
  //   .catch(res => console.log(`An error occurred in getVersionById.${ res.error }`));
  return { pageProps: { versionIdFromCookie: currentVersionId } }
}

export default App;
