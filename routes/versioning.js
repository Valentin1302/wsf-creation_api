const { Router } = require("express");
const version = require("../middlewares/version");
const versioningController = require("../controllers/versioning.js");

const router = new Router();

router.get("/versionings", version({
    v1: versioningController.cgetV1,
    v2: versioningController.cgetV2,
    default: versioningController.cgetLatest,
}));

module.exports = router;
