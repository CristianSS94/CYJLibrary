const { Sequelize, DataTypes } = require("sequelize");

// Configuro la conexión a la base de datos
const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Defino el modelo User
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
    tableName: "user", // Nombre de la tabla en la base de datos
    timestamps: false, // Para que no agregue automáticamente columnas createdAt y updatedAt
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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
  {
    tableName: "book", // Nombre de la tabla en la base de datos
    timestamps: false, // Para que no agregue automáticamente columnas createdAt y updatedAt
  }
);

// Defino las asociaciones
User.hasMany(Book, { foreignKey: "userId", as: "books" });
Book.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = { User, Book, sequelize };
