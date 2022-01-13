import express from "express";
import search from "../services/search.js";
import trailer from "../services/trailer.js";

const router = express.Router();

/**
 * GET /api/v1/search/{q}
 * @summary Search movies
 * @param {string} q.path.required - part of movie title
 * @return {array<object>} 200 - success response - application/json
 */
router.get("/v1/search/:q", async (req, res) => {
  const items = await search(req.params.q);
  res.json(items);
});

/**
 * GET /api/v1/trailer/{title}
 * @summary Search trailer
 * @param {string} title.path.required - full movie title
 * @return {string} 200 - success response - application/json
 */
router.get("/v1/trailer/:title", async (req, res) => {
  const url = await trailer(req.params.title);
  res.json(url);
});

export default router;
