import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../store/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllVersions } from '../utils/bibleConnector'
import App from 'next/app';

const AloneTimeApp = (props) => {
  const initialState = {}

  const composedEnhancers = composeWithDevTools()
  const store = createStore(rootReducer, initialState, composedEnhancers)

  return (
    <Provider store={store}>
      <props.Component {...props}/>
    </Provider>
  )
}

AloneTimeApp.getInitialProps = async ctx => {
  const versions = await getAllVersions().then(res => res.data).catch(`getAllVersions() failed`);
  return { versions }
}

export default AloneTimeApp;
