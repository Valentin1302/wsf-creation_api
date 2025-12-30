const { Game, Publisher, Category } = require("../models");
const getAskedVersion = require("../lib/versioning");
const initTranslation = require("../lib/i18next");
const jsYaml = require("js-yaml");
const jsonxml = require("jsontoxml");

module.exports = {
  cget: async (req, res, next) => {
    const apiVersion = getAskedVersion(req);
    const trad = initTranslation(req);
    const items = await Game.findAll({ include: [Publisher, Category] });

    let data;
    switch (apiVersion) {
      case "v1":
        data = items.map((item) => item.toJSON());
        break;
      case "v2":
        data = items.map((item) => {
          const obj = item.toJSON();
          obj.title_translated = trad(obj.title); 
          return obj;
        });
        break;
      default:
        data = items.map((item) => item.toJSON());
    }

    const itemsWithLinks = data.map((item) => ({
      ...item,
      _links: {
        self: {
          href: `${req.protocol}://${req.get("host")}/v1/games/${item.id}`,
        },
      },
    }));

    res.format({
      "application/json": () => res.json(itemsWithLinks),
      "application/x-yaml": () => {
        res.setHeader("Content-Type", "application/x-yaml");
        res.send(jsYaml.dump(itemsWithLinks));
      },
      "application/xml": () => {
        res.setHeader("Content-Type", "application/xml");
        res.send(jsonxml({ games: itemsWithLinks }));
      },
      default: () => res.json(itemsWithLinks),
    });
  },

  post: async (req, res, next) => {
    const newGame = await Game.create(req.body);
    res.status(201).json(newGame);
  },

  get: async (req, res, next) => {
    const item = await Game.findByPk(req.params.id, {
      include: [Publisher, Category],
    });
    if (!item) return res.status(404).json({ message: "Not found" });

    const result = item.toJSON();
    result._links = {
      collection: { href: `${req.protocol}://${req.get("host")}/v1/games` },
    };

    res.format({
      "application/json": () => res.json(result),
      "application/x-yaml": () => res.send(jsYaml.dump(result)),
      "application/xml": () => res.send(jsonxml({ game: result })),
      default: () => res.json(result),
    });
  },

  patch: async (req, res, next) => {
    const [nbUpdated, [updatedItem]] = await Game.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (nbUpdated === 0) return res.status(404).send();
    res.json(updatedItem);
  },

  delete: async (req, res, next) => {
    const nbDeleted = await Game.destroy({
      where: { id: req.params.id },
    });

    if (nbDeleted === 0) return res.status(404).send();
    res.sendStatus(204);
  },
};
