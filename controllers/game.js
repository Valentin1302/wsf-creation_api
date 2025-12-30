const { Game, Publisher, Category } = require('../models');
const jsYaml = require('js-yaml');
const jsonxml = require('jsontoxml');

module.exports = {
    cget: async (req, res, next) => {
        const items = await Game.findAll({ 
            include: [Publisher, Category] 
        });

        const data = items.map(item => {
            const game = item.toJSON();

            if (req.apiVersion === "v2") {
                game.title_translated = req.trad ? req.trad(game.title) : game.title;
            }

            game._links = {
                self: { href: `${req.protocol}://${req.get('host')}/v1/games/${game.id}` }
            };
            return game;
        });

        res.format({
            'application/json': () => res.json(data),
            'application/x-yaml': () => {
                res.setHeader("Content-Type", "application/x-yaml");
                res.send(jsYaml.dump(data));
            },
            'application/xml': () => {
                res.setHeader("Content-Type", "application/xml");
                res.send(jsonxml({ games: data }));
            },
            default: () => res.json(data)
        });
    },

    post: async (req, res, next) => {
        const newGame = await Game.create(req.body);
        res.status(201).json(newGame);
    },

    get: async (req, res, next) => {
        const item = await Game.findByPk(req.params.id, { 
            include: [Publisher, Category] 
        });

        if (!item) return res.status(404).json({ error: "Game not found" });

        const game = item.toJSON();
        
        game._links = {
            collection: { href: `${req.protocol}://${req.get('host')}/v1/games` }
        };

        res.format({
            'application/json': () => res.json(game),
            'application/x-yaml': () => res.send(jsYaml.dump(game)),
            'application/xml': () => res.send(jsonxml({ game: game })),
            default: () => res.json(game)
        });
    },

    patch: async (req, res, next) => {
        const [nbUpdated, [updatedGame]] = await Game.update(req.body, {
            where: { id: req.params.id },
            returning: true,
        });

        if (nbUpdated === 0) return res.status(404).json({ error: "Game not found" });
        res.json(updatedGame);
    },

    delete: async (req, res, next) => {
        const nbDeleted = await Game.destroy({
            where: { id: req.params.id },
        });

        if (nbDeleted === 0) return res.status(404).json({ error: "Game not found" });
        res.sendStatus(204); 
    },

    cgetPublishers: async (req, res, next) => {
        const items = await Publisher.findAll();
        res.json(items);
    },

    cgetCategories: async (req, res, next) => {
        const items = await Category.findAll();
        res.json(items);
    }
};