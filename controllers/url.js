const { nanoid } = require("nanoid");
// import { nanoid } from 'nanoid';
const URL = require('../models/url');

async function handleGenerateNewShortURL (req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error : "URL is required" });
    const shortID = nanoid(8);
    console.log(shortID, 'This is shortID');
    await URL.create({ 
        shortId: shortID,
        redirectURL: req.body.url,
        visitHistory: [],
    });
    console.log('URL created');
    return res.json({ id : shortID });
}

async function handleGetAnalytics (req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ totalClicks : result.visitHistory.length, analytics : result.visitHistory});
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};