import { parseCookies, setCookie, destroyCookie } from 'nookies';

/* I'm being lazy and copying Dan's dookies. Sorry, Dan. */

/**
 * Sets a cookie. If it is an object, will parse it to a string.
 * Server-side cookies MUST have the context provided.
 * Options info can be found here: https://github.com/maticzav/nookies#reference
 */
function set(name, value, ctx, options) {
  if (!ctx) ctx = null;
  if (!options) options = {
    sameSite: true,
    path: '/',
  };
  if (typeof value === 'object')
    value = JSON.stringify(value);

  setCookie(ctx, name, value, options);
}

/**
 * Get cookies.
 * Server-side cookies MUST have the context provided.
 */
function get(ctx, options) {
  const cookies = {};
  const cooks = parseCookies(ctx, options);
  Object.entries(cooks).forEach(cook => {
    const name = cook[0];
    const value = cook[1];

    try {
      cookies[name] = JSON.parse(value);
    } catch {
      cookies[name] = value;
    }
  });

  return cookies;
}

export default {
  get: get,
  set: set,
};
