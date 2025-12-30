const initTranslation = require('../lib/i18next');

module.exports = (req, res, next) => {
    req.trad = initTranslation(req);
    next();
};