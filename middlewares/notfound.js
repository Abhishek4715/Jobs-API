const notfound = (req, res) => res.staus(404).send("Route does not exist");

module.exports = notfound;