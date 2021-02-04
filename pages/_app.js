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

export default App;
