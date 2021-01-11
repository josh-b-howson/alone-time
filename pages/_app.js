import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const AloneTimeApp = ({ Component, pageProps }) => {

  const initialState = {}

  const composedEnhancers = composeWithDevTools()
  const store = createStore(rootReducer, initialState, composedEnhancers)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default AloneTimeApp;
