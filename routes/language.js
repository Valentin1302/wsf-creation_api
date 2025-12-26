const { Router } = require('express');
const languageController = require('../controllers/language.js');
const translationMiddleware = require('../middleware/translation.js'); 

const router = new Router();

router.use("/languages", translationMiddleware); 

// router.get("/languages", version({
//     v1: languageController.cgetV1,
//     v2: languageController.cgetV2,
//     default: languageController.cgetLatest,
// }));

router.get("/languages", languageController.cget);

router.post("/languages", languageController.post);

router.get("/languages/:id", languageController.get);

router.put("/languages/:id", languageController.put);

router.patch("/languages/:id", languageController.patch);

router.delete("/languages/:id", languageController.delete);

module.exports = router;
