import { combineReducers } from 'redux';
import { versionsReducer } from './versions'
import { versionReducer } from './version'

export default combineReducers({
  versions: versionsReducer,
  version: versionReducer,
});
