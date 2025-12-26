const initTranslation = require("../lib/i18next");

function translationMiddleware(req, res, next) {
    req.t = initTranslation(req, res);
    next();
}

module.exports = translationMiddleware;
