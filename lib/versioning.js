const packageJson = require('../package.json');
const currentFullVersion = packageJson.version;
const currentMajorVersion = currentFullVersion.split('.')[0];

function getAskedVersion(req) {
    const apiVersionHeader = 
    req.headers['x-api-version'] ?? 
    req.headers['X-API-VERSION'] ?? 
    ('v'+currentMajorVersion);
    

    return apiVersionHeader;
}

mmodule.exports = getAskedVersion;