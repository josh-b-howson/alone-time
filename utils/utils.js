/**
 * Returns the API key required to use the api.bible API.
 */
export const getBibleApiKey = () => {
  return process.env.BIBLE_KEY;
};

export const limitCharacters = (value, options) => {
  if (value.length < options.limit)
    return value;
  else if (options.ellipsis)
    return value.substring(0, options.limit - 1).concat('…');
  else
    return value.substring(0, options.limit);
}
