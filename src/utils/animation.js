import React from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches,
  );

  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};
