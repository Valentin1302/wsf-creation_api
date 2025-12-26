const jsxml = require("js2xmlparser");

module.exports = function formatMiddleware(req, res, next) {
  const baseRender = res.render;

  res.render = (view, data, cb) => {
    const accept = req.headers.accept;

    if (accept.includes('application/xml')) {
      res.type('xml');
      const xml = jsxml.parse('response', data);
      return res.send(xml);
    }

    return baseRender.call(res, view, data, cb);
  };

  next();
}


