var express = require("express");
var router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const multerSingle = require("../middleware/multerSingle");
// const multerSingle = require("../middleware/multerSingle");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post("/createuser", usersControllers.createUser);
router.put("/confirmationuser/:token", usersControllers.confirmateUser);
router.post("/loginuser", usersControllers.loginUser);
router.put("/edituser", multerSingle("users"), usersControllers.editUser);
router.put("/deleteuser/:id", usersControllers.deleteUser);

module.exports = router;
