var express = require("express");
var router = express.Router();
const booksControllers = require("../controllers/booksControllers");
// const multerSingle = require("../middleware/multerSingle");

router.post("/createbook", booksControllers.createBook);

module.exports = router;
