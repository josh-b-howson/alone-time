import dookie from '../../utils/dookie';
import { VERSION_SET } from '../types'

// set initial state to cookie value, default to ASV if no cookie found
const versionIdFromCookie = dookie.get().currentVersionId;
const initialState = {
  version: versionIdFromCookie
    ? versionIdFromCookie
    : '06125adad2d5898a-01'
}

/**
 * Keeps track of tile size state.
 */
export const versionReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERSION_SET:
      dookie.set('currentVersionId', action.payload);
      return {
        ...state,
        version: action.payload,
      }
    default:
      return state;
  }
};