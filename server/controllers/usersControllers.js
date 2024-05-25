const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User } = require("../models/models");

class usersControllers {
  //Creacion de usuarios
  createUser = async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Correo no valido" });
      } else {
        // Genera el hash de la contraseña
        const saltRounds = 8;
        const hash = await bcrypt.hash(password, saltRounds);

        // Crea el nuevo usuario en la base de datos utilizando Sequelize
        const newUser = await User.create({
          user_name: name,
          last_name: lastName,
          email: email,
          password: hash,
          is_confirmed: false, // Valor predeterminado
        });

        //Genera el token de confirmación
        const token = jwt.sign({ email: newUser.email }, process.env.T_PASS);

        //Envía el correo de confirmación
        const message = `http://localhost:5173/confirmationuser/${token}`;
        mailer(email, user_name, message);

        // Responde con éxito
        res.status(200).json({
          message:
            "Usuario registrado con éxito, email de confirmación enviado",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al registrar el usuario",
      });
    }
  };

  confirmateUser = async (req, res) => {
    const { token } = req.params;
    jwt.verify(token, process.env.T_PASS, async (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Token no válido" });
      } else {
        try {
          const email = decoded.email;

          // Encuentra el usuario por email
          const user = await User.findOne({ where: { email } });

          if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          }

          // Actualiza el usuario para confirmar la cuenta
          user.is_confirmed = true;
          await user.save();

          res.status(200).json({ message: "Usuario confirmado con éxito" });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error al confirmar el usuario" });
        }
      }
    });
  };

  loginUser = (req, res) => {
    const { email, password } = req.body;

    // Busca al usuario por su correo electrónico utilizando Sequelize
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user /*|| !user.is_confirmed*/) {
          // Si el usuario no existe, ha sido eliminado, no está confirmado o está deshabilitado, responde con un estado 401
          res.status(401).json("Usuario no autorizado");
        } else {
          // Si el usuario existe y está en un estado válido, compara las contraseñas
          bcrypt.compare(password, user.password, (error, response) => {
            if (error) return res.status(500).json(error);

            if (response) {
              // Si las contraseñas coinciden, genera un token JWT con los datos del usuario
              const token = jwt.sign(
                {
                  user: {
                    user_id: user.user_id,
                    type: user.type,
                  },
                },
                process.env.SECRET,
                { expiresIn: "1d" } // Tiempo de expiración del token
              );

              // Responde con el token y los datos del usuario
              res.status(200).json({ token, user });
            } else {
              // Si las contraseñas no coinciden, responde con un estado 401
              res.status(401).json("Email o contraseña incorrecta");
            }
          });
        }
      })
      .catch((error) => {
        // Maneja los errores de la consulta
        console.log(error);
        res.status(500).json(error);
      });
  };

  editUser = async (req, res) => {
    try {
      const { nickname, name, lastname, phonenumber, user_id, email } =
        req.body;

      // Busca al usuario por su ID utilizando Sequelize
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      let img = user.img;

      // Actualiza los campos del usuario
      user.nickname = nickname;
      user.name = name;
      user.lastname = lastname;
      user.email = email;

      if (phonenumber === "") {
        user.phonenumber = null;
      } else {
        user.phonenumber = phonenumber;
      }

      // Si se proporciona una nueva imagen, actualiza la imagen del usuario
      if (req.file) {
        img = req.file.filename;
        user.img = img;
      }

      // Guarda los cambios en la base de datos
      await user.save();

      res
        .status(200)
        .json({ message: "Usuario actualizado correctamente", user, img });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error, message: "Error al actualizar el usuario" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id: user_id } = req.params;
      const { email, nickname } = req.body;

      // Busca al usuario por su ID utilizando Sequelize
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Elimina el usuario de la base de datos
      await user.destroy();

      // Envía un correo electrónico de confirmación de eliminación
      const message = `http://localhost:5173/deleteuser/${user_id}`;
      nodemailerDeleteUser(email, nickname, message);

      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: "Error al eliminar el usuario" });
    }
  };
}

module.exports = new usersControllers();
