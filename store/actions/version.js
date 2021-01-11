import {
  VERSION_SET,
} from '../types';

export const setVersion = data => ({
  type: VERSION_SET,
  payload: data,
});
