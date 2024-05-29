var express = require("express");
var router = express.Router();
const messagesControllers = require("../controllers/messagesControllers");
const multerSingle = require("../middleware/multerSingle");

router.post("/createmessage", messagesControllers.createMessage);
router.delete("/deletemessage/:message_id", messagesControllers.deleteMessage);

module.exports = router;
