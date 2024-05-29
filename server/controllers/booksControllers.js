const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User, Book, Category, Message } = require("../models/models");
const { Op } = require("sequelize");

class booksControllers {
  createBook = async (req, res) => {
    try {
      let { user_id, title, author, description, category_id, year_published } = req.body;

      year_published = parseInt(year_published);
      category_id = parseInt(category_id);

      const userExists = await User.findByPk(user_id);

      if (!userExists) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const categoryExists = await Category.findByPk(category_id);
      if (!categoryExists) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }

      const newBook = await Book.create({
        user_id,
        title,
        author,
        description,
        category_id,
        year_published,
      });

      res.status(201).json({ message: "Libro creado con éxito" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error al registrar el usuario",
      });
    }
  };

  deleteBook = async (req, res) => {
    try {
      let { book_id } = req.params;
      book_id = parseInt(book_id);

      const book = await Book.findByPk(book_id);
      if (!book) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }

      await book.destroy();

      res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      res.status(500).json({ error: "Error al eliminar el libro" });
    }
  };

  editBook = async (req, res) => {
    try {
      const { book_id } = req.params;
      const { title, author, description, category_id, year_published } = req.body;

      const updatedBook = await Book.findByPk(book_id);

      if (!updatedBook) {
        return res.status(404).json({ error: "Libro no encontrado" });
      }

      await updatedBook.update({
        title,
        author,
        description,
        category_id,
        year_published,
      });

      res.status(200).json({ message: "Libro actualizado correctamente" });
    } catch (error) {
      console.error("Error al editar el libro:", error);
      res.status(500).json({ error: "Error al editar el libro" });
    }
  };

  getAllBooks = async (req, res) => {
    try {
      console.log(req.params);
      const { user_id } = req.params;
      const books = await Book.findAll({
        where: {
          user_id: {
            [Op.ne]: user_id, // Excluir libros del usuario especificado
          },
        },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["user_name", "email"],
          },
          {
            model: Category,
            as: "category",
            attributes: ["category_name"],
          },
        ],
      });

      res.status(200).json(books);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      res.status(500).json({ error: "Error al obtener los libros" });
    }
  };
}

module.exports = new booksControllers();
