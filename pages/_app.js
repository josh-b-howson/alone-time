import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { getAllVersions } from '../utils/bibleConnector'
import { initializeStore } from '../store/store';

const App = ({ Component, pageProps }) => {

  const store = initializeStore();

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

App.getInitialProps = async (ctx) => {
  return { pageProps: null }
}

export default App;
