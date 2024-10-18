const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is Required.." });
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    totalClicks: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.totalClicks.length,
    analytics: result.totalClicks,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
