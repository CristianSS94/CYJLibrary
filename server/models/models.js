const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    is_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "user",
    timestamps: false,
  }
);

const Category = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "category",
    timestamps: false,
  }
);

const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
    },
    year_published: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: "book",
    timestamps: false,
  }
);

const Message = sequelize.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    user_sender_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_receiver_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "message",
    timestamps: false,
  }
);

User.hasMany(Book, { foreignKey: "user_id", as: "books" });
Book.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Message, { foreignKey: "user_sender_id", as: "sent_messages" });
User.hasMany(Message, { foreignKey: "user_receiver_id", as: "received_messages" });

Category.hasMany(Book, { foreignKey: "category_id", as: "books" });
Book.belongsTo(Category, { foreignKey: "category_id", as: "category" });

module.exports = { User, Book, Message, Category, sequelize };
