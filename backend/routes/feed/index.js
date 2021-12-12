const router = require("express").Router();
const feed = require("@controllers/feed");
const { query } = require("express-validator");
const { FEED_API } = require("@constants/feed.config");
const { checkForErrors } = require("@middleware/requestValidator");

router.get("/search", [
    query("keyword")
        .isString()
        .isLength({ min: 2, max: 50 })
        .not()
        .isEmpty()
        .trim()
        .withMessage("keyword is mandatory"),
    query("sortBy")
        .default(FEED_API.SORTING_KEYS.NAME)
        .isIn(Object.values(FEED_API.SORTING_KEYS)),
    query("order")
        .default(FEED_API.ORDER.ASC)
        .isIn(Object.values(FEED_API.ORDER)),
    query("page").default(1).isFloat({ min: 1 }),
    query("limit").default(10).isFloat({ min: 1, max: 10 }),
],
    checkForErrors,
    feed.searchFeed
);

module.exports = router;