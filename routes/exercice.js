const { Router } = require('express');
const ExerciceController = require('../controllers/exercice.js');

const router = new Router();
// Collection GET => list
// Http code : 200
router.get("/Exercices", ExerciceController.cget);
// Item POST => create
// Http code : 201
router.post("/Exercices", ExerciceController.post); 
// Item GET => read
// Http code : 200, 404
router.get("/Exercices/:id", ExerciceController.get);
// Item PUT => replace => update or create
// Http code : 200, 201
router.patch("/Exercices/:id", ExerciceController.patch);
// Item DELETE => delete
// Http code : 204, 404
router.delete("/Exercices/:id", ExerciceController.delete);

module.exports = router;