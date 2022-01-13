const nodeImdb = require("node-imdb");
const IMDb = require("imdb-light");
import search from "../services/search.js";
import trailer from "../services/trailer.js";

describe("api", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("search", () => {
    test("should find movies", async () => {
      nodeImdb.searchMovie = jest.fn().mockResolvedValue([{ id: 1 }]);
      nodeImdb.getMovie = jest.fn().mockResolvedValue({ title: "title" });

      const items = await search("test");
      expect(items).toEqual([{ title: "title" }]);
    });

    test("should return empty movies array", async () => {
      nodeImdb.searchMovie = jest.fn().mockResolvedValue([]);

      const items = await search();
      expect(items).toEqual([]);
    });
  });

  describe("trailer", () => {
    test("should find trailer", async () => {
      nodeImdb.searchMovie = jest.fn().mockResolvedValue([{ id: 1 }]);
      IMDb.trailer = jest.fn().mockImplementation((id, cb) => cb("url"));

      const url = await trailer("id");
      expect(url).toBe("url#t=1");
    });

    test("should return empty result", async () => {
      nodeImdb.searchMovie = jest.fn().mockResolvedValue([{ id: 1 }]);
      IMDb.trailer = jest.fn().mockImplementation((id, cb) => cb(null));

      const url = await trailer();
      expect(url).toBe("");
    });
  });
});
