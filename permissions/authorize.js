module.exports = (roles) => {
    return (req, res, next) => {
        if (roles.indexOf(req.user?.role) !== -1) {
            next();
        } else {
            res.status(403).send({ error: "User is not accessed" });
        }
    };
};
