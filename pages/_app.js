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
  //get preferred version from cookie, else default to ASV
  const currentVersionId = cookies.currentVersionId
    ? cookies.currentVersionId
    : "06125adad2d5898a-01";

  return { pageProps: { versionIdFromCookie: currentVersionId } }
}

export default App;
