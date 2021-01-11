import { VERSIONS_SET } from '../types'

const initialState = {}

/**
 * List of all versions
 */
export const versionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERSIONS_SET:
      return {
        ...state,
        versions: action.payload,
      }
    default:
      return state;
  }
};