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
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  user_name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  is_confirmed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'user', // Nombre de la tabla en la base de datos
  timestamps: false  // Para que no agregue automáticamente columnas createdAt y updatedAt
});

module.exports = { User, sequelize };