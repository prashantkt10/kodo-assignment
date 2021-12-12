const healthTest = (req, res) => {
    return res.send('ok');
}

module.exports = { healthTest };