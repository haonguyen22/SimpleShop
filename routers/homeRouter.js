const app = require("express");
const { homePage } = require("./../controllers/homeCtrl.js");
const auth = require("../middlewares/auth.js");
const router = app.Router();

router.get("/", auth, homePage);

router.get("/home", auth, homePage);

module.exports = router;
