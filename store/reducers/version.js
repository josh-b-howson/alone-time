import dookie from '../../utils/dookie';
import { VERSION_SET } from '../types'

const initialState = {}

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