module.exports = function (err, req, res, next) {
    console.log(err);
    res.status(500).send({
        error: { message: "Something Failed", reason: err.message, errorStack: err },
    });
};
