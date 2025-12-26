const { Router } = require('express');
const taskController = require('../controllers/task.js');

const router = new Router();
// Collection GET => list
// Http code : 200
router.get("/tasks", taskController.cget);
// Item POST => create
// Http code : 201
router.post("/tasks", taskController.post); 
// Item GET => read
// Http code : 200, 404
router.get("/tasks/:id", taskController.get);
// Item PUT => replace => update or create
// Http code : 200, 201
router.put("/tasks/:id", taskController.put);
// Item PATCH => update partial
// Http code : 200, 404
router.patch("/tasks/:id", taskController.patch);
// Item DELETE => delete
// Http code : 204, 404
router.delete("/tasks/:id", taskController.delete);

module.exports = router;