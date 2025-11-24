const express = require("express");
const router = express.Router();
const LinkController = require("../controllers/linkControllers");
router.post("/create", LinkController.createShortUrl);
router.get("/list", LinkController.getAllLinks);
router.get("/view/:code", LinkController.getLinkById);
router.delete("/delete/:code", LinkController.deleteLink);
// redirect route (must be last)
router.get("/:code", LinkController.redirectUrl);

module.exports = router;
