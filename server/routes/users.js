var express = require("express");
var router = express.Router();
const usersControllers = require("../controllers/usersControllers");
const multerSingle = require("../middleware/multerSingle");
// const multerSingle = require("../middleware/multerSingle");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//Crear usuario
router.post("/createuser", usersControllers.createUser);
//TODO
//Confirmar el correo del usuario
router.put("/confirmationuser/:token", usersControllers.confirmateUser);
//Logar al usuario
router.post("/loginuser", usersControllers.loginUser);
//Editar al usuario
router.put("/edituser", multerSingle("users"), usersControllers.editUser);
//Eliminar al usuario
router.delete("/deleteuser/:id", usersControllers.deleteUser);
//traer datos de un usuario
router.get("/userdata/:id", usersControllers.getUser);
router.put("/verifypassword/:user_id", usersControllers.verifyPassword);
router.put("/editpassword/:user_id", usersControllers.editPassword);

module.exports = router;
