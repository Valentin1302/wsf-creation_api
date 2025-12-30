module.exports = function hateoas(req, res, next) {
  const originalJson = res.json.bind(res);

  function addLinksToItem(item, baseUrl) {
    if (!item || typeof item !== 'object' || !item.id) return item;
    const copy = { ...item };
    copy._links = copy._links || {};
    copy._links.self = { href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${copy.id}` };
    copy._links.collection = { href: `${req.protocol}://${req.get('host')}${req.baseUrl}` };

    if (item.publisher && item.publisher.id) {
      copy._links.publisher = { href: `${req.protocol}://${req.get('host')}/v1/publishers/${item.publisher.id}` };
    }

    if (Array.isArray(item.categories)) {
      copy._links.categories = { href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${copy.id}/categories` };
    }
    return copy;
  }

  res.json = function (body) {
    if (Array.isArray(body)) {
      return originalJson(body.map(it => addLinksToItem(it, req.baseUrl)));
    }
    if (body && typeof body === 'object' && body.id) {
      return originalJson(addLinksToItem(body, req.baseUrl));
    }
    return originalJson(body);
  };
  next();
};
