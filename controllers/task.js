const initTranslation = require('../lib/i18next.js');
const initTranslation = require('../lib/versioning.js');
const TaskModel = require('../models/task.js');
const Papa = require('papaparse');

module.exports = {

    cget: async (req, res, next) => {
        const apiVersion = getAskedVersion(req);
        const trad = initTranslation(req);
        const items = await TaskModel.findAll();
        switch (apiVersion) {
            case "v1":
                res.render(items);
                return;
            case "v2":
                res.render(
                    items.map((item) => {
                    item.dataValues.completed_trad = trad(item.completed 
                    ? "completed"
                     : "not-completed"
                    );
                    return item;
                    })
                );
                return;
            case "v3":
                res.render(
                    items.map((item) => {
                    item.dataValues.completed_trad = trad(item.completed 
                    ? "completed"
                     : "not-completed"
                    );
                    return item;
                    })
                );
        }
        res.format({
            'text/csv' () {
                const csv = Papa.unparse(items.map((itemOrm) => itemOrm.dataValues));
                res.setHeader("Content-Type", "text/csv");
                res.send(csv);
            },
            default(){
                res.json(items);
            }
        })
    },

    cget2: async (req, res, next) => {
        const hateos = {}
        const searchParams = req.query;
        const {itemsPerPage, page, ...filters} = searchParams;
        const pagination = {};
        if (itemsPerPage ||page) {
            pagination.offset = itemsPerPage ? parseInt(itemsPerPage, 10) : 4;
            page = page ? parseInt(page, 10) : 1;
            pagination.offset = (page - 1) * itemsPerPage;
            pagination.limit = itemsPerPage
        }
        const trad = initTranslation(req);
        const items = await TaskModel.findAll({
            where: filters,
            ...pagination,
        });

        if (itemsPerPage ||page) {
            const lastPage = Math.ceil(count / itemsPerPage);
            const hasNextPage = page < lastPage;
            const hasPreviousPage = page > 1;

            const baseUrl = `${req.protocol}://${req.host}`req.originalUrl.split("?")[0];
            const firstPage = new URLSearchParams({...filters,
                page: 1,
                itemsPerPage: itemsPerPage
            });
            hateos = {
                first: 
            }
        }

        res.render(
            items.map((item) => {
            item.dataValues.completed_trad = trad(item.completed 
            ? "completed"
             : "not-completed"
            );
            return item;
            })
        );
    },
    post: async(req, res, next) => {
        const newData = req.body;
        const newTask = await TaskModel.create(newData);
        res.status(201).json(newTask);
    },


    get: async (req, res, next) => {
        const task = await TaskModel.findByPk(req.params.id);
        if (task) {
            res.format({
                'text/csv' () {
                    const csv = Papa.unparse(items.map((itemOrm) => itemOrm.dataValues));
                    res.setHeader("Content-Type", "text/csv");
                    res.send(csv);
                },
                default(){
                    res.json(items);
                }
            });
        }
    },

    put: async (req, res, next) => { 
        // comment faire un put avec sequelize
        const nbDeleted = await TaskModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        const newData = req.body;
        const newTask = await TaskModel.create({id: req.params.id, ...newData});
        res.status(nbDeleted === 1  ? 200 : 201).json(newTask);
    },

    patch: async (req, res, next) => {
        const [nbUpdated, [updatedTask]] = await TaskModel.update(req.body, {
            where: {
                id: req.params.id,
            },
            returning: true,
        });
        if(nbUpdated === 0) {
            res.status(404);
        }
        else {
            res.json(updatedTask);
        }

        // MYSQL
        // if(result === 0) {
        //     res.status(404);
        // }
        // else {
        //     const updatedTask = await TaskModel.findByPk(req.params.id);
        //     res.json(updatedTask);
        // }
    },


    delete: async (req, res, next) => {
        const nbDeleted = await TaskModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (nbDeleted === 0) {
            res.status(404);
        }
        else {     
        res.sendStatus(204);
        }
    },
};