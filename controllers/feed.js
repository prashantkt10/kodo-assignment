const { normalizeLimit } = require("@helpers/utils");
const { validationResult } = require("express-validator/check");
const { searchFeedBasedOnQuery } = require("@services/feed");

const searchFeed = async (req, res, next) => {
    let { keyword, sortBy, order, page, limit } = req.query;
    const searchedFeed = await searchFeedBasedOnQuery({ keyword, sortBy, order, page, limit });
    return res.json(searchedFeed);
}

module.exports = {
    searchFeed
}