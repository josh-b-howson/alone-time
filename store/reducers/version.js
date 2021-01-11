import { VERSION_SET } from '../types'

const initialState = {}

/**
 * Keeps track of tile size state.
 */
export const versionReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERSION_SET:
      return {
        ...state,
        version: action.payload,
      }
    default:
      return state;
  }
};