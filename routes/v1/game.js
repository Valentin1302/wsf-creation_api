const { Router } = require('express');
const gameController = require('../../controllers/game');
const versioning = require('../../middlewares/versioning'); 
const i18n = require('../../middlewares/i18');
const { validateGame } = require('../../middlewares/game');

const router = new Router();

router.use(versioning);
router.use(i18n);

router.get("/games", gameController.cget);
router.post("/games", gameController.post);
router.get("/games/:id", gameController.get);
router.patch("/games/:id", gameController.patch);
router.delete("/games/:id", gameController.delete);

module.exports = router;
