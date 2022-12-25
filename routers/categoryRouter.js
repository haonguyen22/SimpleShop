const app = require("express");
const { getProductByCategoryID } = require("../controllers/productCtrl");

const router = app.Router();

router.get("/:id", getProductByCategoryID);

module.exports = router;
