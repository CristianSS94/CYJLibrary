var express = require("express");
var router = express.Router();
const chatsControllers = require("../controllers/chatsControllers");
const multerSingle = require("../middleware/multerSingle");

router.post("/createchat", chatsControllers.createChat);
router.delete("/deletechat/:chat_id", chatsControllers.deleteChat);

module.exports = router;
