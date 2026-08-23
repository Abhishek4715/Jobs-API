const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }

    if (err.code === 11000) {
        return res.status(400).json({ msg: `Duplicate value entered for ${Object.keys(err.keyValue)} field` });
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(item => item.message).join(', ');
        return res.status(400).json({ msg: message });
    }

    if (err.name === "CastError") {
        return res.status(404).json({ msg: `No item found with id: ${err.value}` });
    }

    console.error(err);
    res.status(500).json({ msg: "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;