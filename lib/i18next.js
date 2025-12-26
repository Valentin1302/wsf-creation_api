const i18next = require('i18next');

module.exports = function initTranslation(req, res) {
    const languageChain = req.headers["accept-language"] ?? req.headers["Accept-Language"] ?? "en";

    const supportedLanguages = ["en", "fr"];

    const languages = languageChain
        .split(/,\s*/)
        .map((languageItem) => languageItem.split(";q="))
        .sort((a, b) => {
            a[1] = a[1] !== undefined ? parseFloat(a[1]) : 1;
            b[1] = b[1] !== undefined ? parseFloat(b[1]) : 1;
            return b[1] - a[1];
        })
        .map(([lang]) => lang.toLowerCase()); 

    const filtered = languages
        .map(lang => lang.split("-")[0]) 
        .filter(lang => supportedLanguages.includes(lang));

    const lng = filtered[0] ?? "en";

    i18next.init({
        lng,
        fallbackLng: "en",
        resources: {
            en: require('../locales/en.json'),
            fr: require('../locales/fr.json'),
        }
    });

    // Définir l'entête HTTP
    if (res) {
        res.set("Content-Language", lng);
    }

    return i18next.t.bind(i18next);
}