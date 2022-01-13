import cache from "./memory-cache.js";
import { searchMovie } from "node-imdb";
import IMDb from "imdb-light";

export default title => {
  return new Promise(async resolve => {
    const cacheKey = `trailer-${title}`;
    const cachedUrl = cache.get(cacheKey);
    if (cachedUrl) {
      return resolve(cachedUrl);
    }

    const id = await searchMovie(encodeURIComponent(title)).then(r => r[0]?.id);
    if (!id) {
      return resolve("");
    }
    IMDb.trailer(id, data => {
      const url = typeof data === "string" ? data + "#t=1" : "";
      cache.put(cacheKey, url);
      resolve(url);
    });
  });
};
