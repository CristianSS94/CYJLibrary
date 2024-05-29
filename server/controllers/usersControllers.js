const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User, Book, Message, Category, Chat } = require("../models/models");

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
        const message = `http://localhost:5173/confirmateuser/${token}`;
        mailer(email, name, message);

        res.status(200).json({
          message: "Usuario registrado con éxito, email de confirmación enviado",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al registrar el usuario",
      });
    }
  };

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Busca al usuario por su email
      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: Book,
            as: "books",
            required: false,
          },
          { model: Chat, as: "ChatsInitiador", required: false, include: [{ model: Message, as: "messages", required: false }] },
          { model: Chat, as: "ChatsRecipient", required: false, include: [{ model: Message, as: "messages", required: false }] },
        ],
      });
      const passwordCompare = await bcrypt.compare(password, user.password);
      // Verifica si el usuario existe y si la contraseña es correcta
      if (user /*&& user.is_confirmed == true*/ && passwordCompare) {
        // Genera un token
        const token = jwt.sign({ user_id: user.user_id }, process.env.T_PASS, { expiresIn: "1h" });

        res.status(200).json({ message: "Login correcto", user, token });
      } else {
        res.status(401).json({ message: "Email o contraseña incorrecta" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error en el login" });
    }
  };

  editUser = async (req, res) => {
    try {
      const { user_name, last_name, phone_number, user_id } = req.body;

      // Busca al usuario por su ID utilizando Sequelize
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Actualiza los campos del usuario
      user.user_name = user_name;
      user.last_name = last_name;
      if (phone_number) {
        user.phone_number = phone_number;
      }

      // Si se proporciona una nueva imagen, actualiza la imagen del usuario
      if (req.file) {
        user.img = req.file.filename;
      }

      // Guarda los cambios en la base de datos
      await user.save();

      res.status(200).json({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: "Error al actualizar el usuario" });
    }
  };

  getUser = async (req, res) => {
    try {
      const { id: user_id } = req.params;
      const user = await User.findByPk(parseInt(user_id), {
        include: [
          {
            model: Book,
            as: "books",
            required: false,
          },
          { model: Chat, as: "ChatsInitiador", required: false, include: [{ model: Message, as: "messages", required: false }] },
          { model: Chat, as: "ChatsRecipient", required: false, include: [{ model: Message, as: "messages", required: false }] },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error, message: "Error al llamar al usuario" });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { id: user_id } = req.params;

      // Busca al usuario por su ID utilizando Sequelize
      const user = await User.findByPk(user_id);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Elimina el usuario de la base de datos
      await user.destroy();

      // Envía un correo electrónico de confirmación de eliminación

      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error, message: "Error al eliminar el usuario" });
    }
  };

  //Confirmar el mail del usuario mediante nodemailer
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
          res.status(500).json({ message: "Error al confirmar el usuario" });
        }
      }
    });
  };

  verifyPassword = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { password } = req.body;
      const user = await User.findByPk(parseInt(user_id));
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isVerify = await bcrypt.compare(password, user.password);
      if (isVerify) {
        return res.status(200).json({ message: "Contraseña correcta" });
      } else {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al confirmar la contraseña" });
    }
  };

  editPassword = async (req, res) => {
    try {
      const { user_id } = req.params;
      const { password } = req.body;

      const user = await User.findByPk(parseInt(user_id));

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      user.password = hashedPassword;

      await user.save();

      res.status(200).json({ message: "Usuario actualizado correctamente", user });
    } catch (error) {
      res.status(500).json({ message: "Error al modificar la contraseña" });
    }
  };

  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Book,
            as: "books",
            required: false,
          },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  };
}

module.exports = new usersControllers();
