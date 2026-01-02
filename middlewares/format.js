const jsYaml = require('js-yaml');
const jsonxml = require('jsontoxml');

function detectFormat(req) {
  const accept = (req.get('accept') || '').toLowerCase();
  if (accept.includes('yaml')) return 'yaml';
  if (accept.includes('xml')) return 'xml';
  return 'json';
}

function resourceName(req, body) {
  const path = (req.path || '').split('/').filter(Boolean);
  const base = path[0] || 'items';
  return Array.isArray(body) ? base : base.replace(/s$/,'');
}

module.exports = function formatMiddleware(req, res, next) {
  res.sendFormatted = function(body, opts = {}) {
    const fmt = detectFormat(req);
    const name = opts.root || resourceName(req, body);

    if (fmt === 'yaml') {
      res.setHeader('Content-Type', 'application/x-yaml');
      return res.send(jsYaml.dump(body));
    }
    if (fmt === 'xml') {
      res.setHeader('Content-Type', 'application/xml');
      const wrapped = Array.isArray(body) ? { [name]: body } : { [name]: body };
      return res.send(jsonxml(wrapped, { prettyPrint: true }));
    }
    res.setHeader('Content-Type', 'application/json');
    return res.json(body);
  };
  next();
};