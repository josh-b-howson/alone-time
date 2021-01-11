import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllVersions } from '../utils/bibleConnector'

const AloneTimeApp = ({ Component, pageProps, appProps }) => {

  const initialState = {}

  const composedEnhancers = composeWithDevTools()
  const store = createStore(rootReducer, initialState, composedEnhancers)

  return (
    <Provider store={store}>
      <Component {...appProps} {...pageProps} />
    </Provider>
  )
}

export async function getServerSideProps(ctx) {
  const versions = await getAllVersions().then(res => res.data).catch(`getAllVersions() failed`);
  return {appProps: {versions}}
}

export default AloneTimeApp;
