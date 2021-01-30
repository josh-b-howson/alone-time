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

export const getFeaturedVersions = (versions) => {
  const featuredVersions = versions.map(version => {
    const featuredItems = [
      '06125adad2d5898a-01',
      '65eec8e0b60e656b-01',
      'de4e12af7f28f599-02',
      '2f0fd81d7b85b923-01',
      'c315fa9f71d4af3a-01',
      '01b29f4b342acc35-01',
    ]
    if (featuredItems.includes(version.id))
      return version;
  });

  return featuredVersions.filter(i => !!i);
}