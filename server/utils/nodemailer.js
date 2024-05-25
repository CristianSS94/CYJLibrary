const nodemailer = require("nodemailer");
const connection = require("../config/db");
require("dotenv").config(); // por si acaso no sabemos aun

async function mailer(email, nickname, message) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NM_USER, // lo está mirando juanjo
      pass: process.env.NM_PASS, // VERIFIACION EN DOS PASOS Y LUEGO CONTRASEÑA DE aplicación
    },
  });

  if (email) {
    const info = await transporter.sendMail({
      from: `"CYJBooks" <${process.env.NM_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Bienvenido a CYJBooks", // Subject line
      // text: "Hola algo bonito", // plain text body
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #1D1D1B; padding-bottom: 1px">

    <div style="text-align: center; background-color: #1D1D1B; padding: 10px; color: #black;">
      <p style="margin: 0;">¡Bienvenido a CYJBooks!</p>
    </div>
  
    <h2 style="margin: 20px; color: #fff;">Hola, ${
      user_name && user_name.charAt(0).toUpperCase() + user_name.slice(1)
    }</h2>
  
    <p style="margin: 20px; color: #fff;">Gracias por completar tu registro en Ascendio.</p>
  
    <p style="margin: 20px; color: #fff;">Para activar tu cuenta, pulsa <a href="${message}" style="text-decoration: none; color: #black;">aquí</a>.</p>
  </div> `, // html body
    });

    console.log("Message sent: %s", info.messageId);
  }
}

module.exports = mailer;
//cristian.mlg.94@hotmail.com
