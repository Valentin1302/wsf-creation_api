const { Router } = require("express");
const gameController = require("../controllers/game");

const router = new Router();

router.get("/games", gameController.cget);
router.post("/games", gameController.post);
router.get("/games/:id", gameController.get);
router.patch("/games/:id", gameController.patch);
router.delete("/games/:id", gameController.delete);

module.exports = router;
