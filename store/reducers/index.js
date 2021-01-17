import { combineReducers } from 'redux';
import { versionReducer } from './version'

export default combineReducers({
  version: versionReducer,
});
