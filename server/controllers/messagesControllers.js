const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User, Book, Message, Category } = require("../models/models");

class messagesControllers {
  createMessage = async (req, res) => {};
  deleteMessage = async (req, res) => {};
}

module.exports = new messagesControllers();
