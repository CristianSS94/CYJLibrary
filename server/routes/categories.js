var express = require("express");
var router = express.Router();
const categoriesControllers = require("../controllers/categoriesControllers");
// const multerSingle = require("../middleware/multerSingle");

router.get("/allCategories", categoriesControllers.getAllCategories);

module.exports = router;
