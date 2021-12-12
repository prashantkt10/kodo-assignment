const { searchFeedBasedOnQuery } = require("@services/feed");
const httpStatus = require("http-status");

const searchFeed = async (req, res, next) => {
    try {
        let { keyword, sortBy, order, page, limit } = req.query;
        const searchedFeed = await searchFeedBasedOnQuery({ keyword, sortBy, order, page, limit });
        return res.status(httpStatus.OK).json({
            ...searchedFeed,
            status: httpStatus.OK
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
}

module.exports = {
    searchFeed
}