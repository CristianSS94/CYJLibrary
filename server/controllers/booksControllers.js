const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User, Book, Category, Message } = require("../models/models");

class booksControllers {
  createBook = async (req, res) => {
    try {
      console.log(req.body);
      let { user_id, title, author, description, category_id, year_published } = req.body;

      year_published = parseInt(year_published);
      category_id = parseInt(category_id);
      console.log(category_id);
      console.log(year_published);

      const userExists = await User.findByPk(user_id);

      if (!userExists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const categoryExists = await Category.findByPk(category_id);
      if (!categoryExists) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      res.status(201).json({ message: "Libro creado con éxito" });

      const newBook = await Book.create({
        user_id,
        title,
        author,
        description,
        category_id,
        year_published,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error al registrar el usuario",
      });
    }
  };
}

module.exports = new booksControllers();
