import cache from "./memory-cache.js";
import { getMovie, searchMovie } from "node-imdb";

export default async q => {
  const cacheKey = `search-${q}`;
  const cachedItems = cache.get(cacheKey);
  if (cachedItems) {
    return cachedItems;
  }

  const ids = await searchMovie(encodeURIComponent(q)).then(r =>
    r.slice(0, 5).map(i => i.id)
  );
  const items = await Promise.allSettled(ids.map(id => getMovie(id))).then(r =>
    r.filter(r => r.value).map(r => r.value)
  );
  cache.put(cacheKey, items);

  return items;
};
