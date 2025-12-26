const { Router } = require('express');
const UserController = require('../controllers/user.js');

const router = new Router();
// Collection GET => list
// Http code : 200
router.get("/Users", UserController.cget);
// Item POST => create
// Http code : 201
router.post("Users", UserController.post); 
// Item GET => read
// Http code : 200, 404
router.get("/Users/:id", UserController.get);
// Item PUT => replace => update or create
// Http code : 200, 201
router.put("/Users/:id", UserController.put);
// Item PATCH => update partial
// Http code : 200, 404
router.patch("/Users/:id", UserController.patch);
// Item DELETE => delete
// Http code : 204, 404
router.delete("/Users/:id", UserController.delete);

// Route actions ends with a verb
// Http code : 200

// Collection action

router.post("/Users/:id/activate", UserController.activate);
module.exports = router;