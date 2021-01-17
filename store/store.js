import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

export const initializeStore = () => {
  const initialState = {}

  const composedEnhancers = composeWithDevTools()
  const store = createStore(rootReducer, initialState, composedEnhancers)
  return store;
}
