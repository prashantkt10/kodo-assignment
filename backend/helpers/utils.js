const normalizeLimit = ({ limit }) => {
    return Number(limit) > 10 ? 10 : Number(limit);
}


module.exports = {
    normalizeLimit
}