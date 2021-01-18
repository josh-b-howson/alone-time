import {
  VERSION_SET,
} from '../types';

export const setVersionId = data => ({
  type: VERSION_SET,
  payload: data,
});
