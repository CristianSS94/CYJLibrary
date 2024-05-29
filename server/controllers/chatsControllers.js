const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User, Book, Message, Category } = require("../models/models");

class chatsControllers {
  createChat = async (req, res) => {};
  deleteChat = async (req, res) => {};
}

module.exports = new chatsControllers();
