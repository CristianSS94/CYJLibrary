const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/nodemailer");
require("dotenv").config();
const { User, Book, Message, Category, Chat } = require("../models/models");

class chatsControllers {
  createChat = async (req, res) => {
    try {
      const { initiatorId: initiator_id, recipientId: recipient_id } = req.body;

      const initiator = await User.findByPk(initiator_id);
      const recipient = await User.findByPk(recipient_id);

      if (!initiator || !recipient) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Crear el chat
      const chat = await Chat.create({
        initiator_id,
        recipient_id,
      });

      return res.status(201).json(chat);
    } catch (error) {
      console.error("Error al crear el chat:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  };

  deleteChat = async (req, res) => {
    const chatId = req.params.id;

    try {
      const chat = await Chat.findByPk(chatId);

      if (!chat) {
        return res.status(404).json({ message: "Chat no encontrado" });
      }

      await chat.destroy();

      return res.status(204).end();
    } catch (error) {
      console.error("Error al eliminar el chat:", error);
      return res.status(500).json({ message: "Error del servidor" });
    }
  };
}

module.exports = new chatsControllers();
