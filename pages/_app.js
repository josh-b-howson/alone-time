import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllVersions } from '../utils/bibleConnector'
import App from 'next/app';

const AloneTimeApp = ({ Component, pageProps, versions }) => {
  const initialState = {}

  const composedEnhancers = composeWithDevTools()
  const store = createStore(rootReducer, initialState, composedEnhancers)

  return (
    <Provider store={store}>
      <Component {...pageProps} versions={versions} />
    </Provider>
  )
}

AloneTimeApp.getInitialProps = async (appContext) => {
  const versions = await getAllVersions().then(res => res.data).catch(`getAllVersions() failed`);
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  // const appProps = await App.getInitialProps(appContext);
  return { versions }
}

export default AloneTimeApp;
