const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User, Book, Category, Message } = require("../models/models");

class categoriesControllers {
  getAllCategories = async (req, res) => {
    try {
      const categories = await Category.findAll({
        attributes: ["category_id", "category_name"],
      });
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving categories" });
    }
  };
}

module.exports = new categoriesControllers();
