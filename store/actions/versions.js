import {
  VERSIONS_SET,
} from '../types';

export const setVersions = data => ({
  type: VERSIONS_SET,
  payload: data,
});
