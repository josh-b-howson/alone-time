import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { initializeStore } from '../store/store';
import dookie from '../utils/dookie';
import '../scss/main.scss';

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
    
  return { pageProps: { versionIdFromCookie: currentVersionId } }
}

export default App;
