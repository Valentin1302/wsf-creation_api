const User = require('../models/task.js');
const UserModel = require('../models/task.js');

module.exports = {

    cget: async (req, res, next) => {
        res.
        res.json(await UserModel.findAll());
    },


    post: async(req, res, next) => {
        const newData = req.body;
        const newUser = await UserModel.create(newData);
        res.json({
            success: true,
            User: newUser,
            message: 'User added',
        });
        res.json({
            success: true,
            error: 'Invalid data',
        });
        res.status(201).json(newUser);
    },


    get: async (req, res, next) => {
        const User = await UserModel.findByPk(req.params.id);
        if (User) {
            res.json(User);
        } else {
            res.status(404);
        }
    },

    put: async (req, res, next) => { 
        // comment faire un put avec sequelize
        const nbDeleted = await UserModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        const newData = req.body;
        const newUser = await UserModel.create({id: req.params.id, ...newData});
        res.status(nbDeleted === 1  ? 200 : 201).json(newUser);
    },

    patch: async (req, res, next) => {
        const [nbUpdated, [updatedUser]] = await UserModel.update(req.body, {
            where: {
                id: req.params.id,
            },
            returning: true,
        });
        if(nbUpdated === 0) {
            res.status(404);
        }
        else {
            res.json(updatedUser);
        }

        // MYSQL
        // if(result === 0) {
        //     res.status(404);
        // }
        // else {
        //     const updatedUser = await UserModel.findByPk(req.params.id);
        //     res.json(updatedUser);
        // }
    },


    delete: async (req, res, next) => {
        const nbDeleted = await UserModel.destroy({
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

    activate: async (req, res, next) => {
        const nbUpdated = await UserModel.update(
            {
                activate:true,
            },
            {
                where: {
                    id: req.params.id,
                },
                returning: true,
            }
        );
        if (nbUpdated === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    },
};