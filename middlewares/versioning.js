module.exports = function versioning(req, res, next) {
    const versionHeader = req.headers["accept-version"];

    const version = versionHeader ? `v${versionHeader}` : "v1";

    req.apiVersion = version;
}