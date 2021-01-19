import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { initializeStore } from '../store/store';
import dookie from '../utils/dookie';

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
  const cookies = dookie.get(ctx);
  const currentVersionId = cookies.currentVersionId
    ? cookies.currentVersionId
    : null;
    
  // const currentVersion = await getVersionById(currentVersionId)
  //   .then(res => res.json())
  //   .then(json => json.data)
  //   .catch(res => console.log(`An error occurred in getVersionById.${ res.error }`));
  return { pageProps: { versionIdFromCookie: currentVersionId } }
}

export default App;
