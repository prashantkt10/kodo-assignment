const NodeCache = require("node-cache");
const { SORTING_KEYS, ORDER } = require("@constants/feed.config").FEED_API;
const feedData = require("@assignment/prod-feed.json");

const feedCache = new NodeCache();

const searchByKeyword = ({ keyword, feedData }) => {
    let firstChar = keyword[0],
        lastChar = keyword[keyword.length - 1],
        filteredFeed = [];
    if (firstChar === '"' && lastChar === '"') {
        for (let index = 0; index < feedData.length; index++) {
            let keywordForSearching = keyword.slice(1, keyword.length - 2).toLowerCase();
            const currentFeed = feedData[index];
            const { name, description } = currentFeed;
            if (name.toLowerCase().indexOf(keywordForSearching) > -1 || description.toLowerCase().indexOf(keywordForSearching) > -1) {
                filteredFeed.push(currentFeed);
            }
        }
    } else {
        let splittedKeyword = keyword.split(" ").map((w) => w.toLowerCase());
        for (let index = 0; index < feedData.length; index++) {
            const currentFeed = feedData[index];
            const { name, description } = currentFeed;
            for (let index = 0; index < splittedKeyword.length; index++) {
                const currentKeyword = splittedKeyword[index];
                if (name.toLowerCase().indexOf(currentKeyword) > -1 || description.toLowerCase().indexOf(currentKeyword) > -1) {
                    filteredFeed.push(currentFeed);
                    break;
                }
            }
        }
    }
    return { filteredFeed };
}

const sortFilteredFeed = ({ filteredFeed, sortBy, order }) => {
    if (sortBy === SORTING_KEYS.NAME) {
        return filteredFeed.sort((feed1, feed2) => {
            let textA = feed1.name.toUpperCase();
            let textB = feed2.name.toUpperCase();
            if (order === ORDER.ASC)
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            else if (order === ORDER.DESC)
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });
    }
    if (sortBy === SORTING_KEYS.DATE_LAST_EDITED) {
        return filteredFeed.sort((feed1, feed2) => {
            if (order === ORDER.ASC)
                return new Date(feed1.dateLastEdited) - new Date(feed2.dateLastEdited);
            else if (order === ORDER.DESC)
                return new Date(feed2.dateLastEdited) - new Date(feed1.dateLastEdited);
        });
    }
}

const getByPageAndLimit = ({ filteredFeed, page, limit }) => {
    let skip = (page - 1) * limit;
    return filteredFeed.splice(skip, limit);
}

const generateCacheKey = ({ keyword, sortBy, order, page, limit }) => {
    return `k${keyword}&sortBy${sortBy}&order${order}&page${page}&limit${limit}`;
}

const prepareFeedForResponse = ({ feed, page, limit }) => {
    return {
        currentPage: page,
        totalPages: Math.ceil(feed.length / limit),
        currentFeedCount: feed.length,
        feed: feed
    };
}

const searchFeedBasedOnQuery = async ({ keyword, sortBy, order, page, limit }) => {
    const feedKey = generateCacheKey({ keyword, sortBy, order, page, limit });
    const cachedFeed = await feedCache.get(feedKey);
    if (cachedFeed) return prepareFeedForResponse({ feed: cachedFeed, page, limit });
    let { filteredFeed } = searchByKeyword({ keyword, feedData });
    filteredFeed = sortFilteredFeed({ filteredFeed, sortBy, order });
    filteredFeed = getByPageAndLimit({ filteredFeed, page, limit });
    feedCache.set(feedKey, filteredFeed, 60);
    return prepareFeedForResponse({ feed: filteredFeed, page, limit })
}

module.exports = {
    searchFeedBasedOnQuery
}
