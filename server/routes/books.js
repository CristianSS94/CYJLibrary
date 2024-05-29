var express = require("express");
var router = express.Router();
const booksControllers = require("../controllers/booksControllers");
// const multerSingle = require("../middleware/multerSingle");

router.post("/createbook", booksControllers.createBook);
router.delete("/delete/:book_id", booksControllers.deleteBook);
router.put("/edit/:book_id", booksControllers.editBook);
router.get("/getallbooks/:user_id", booksControllers.getAllBooks);

module.exports = router;
