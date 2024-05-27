const nodemailer = require("nodemailer");
const connection = require("../config/db");
require("dotenv").config(); // por si acaso no sabemos aun

async function mailer(email, user_name, message) {
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
      <div style="font-family: Arial, sans-serif; background-color: #ffffff; padding-bottom: 1px; color: #000000;">

        <div style="text-align: center; background-color: #ffffff; padding: 10px;">
          <p style="margin: 0;">¡Bienvenido a CYJBooks!</p>
        </div>

        <h2 style="margin: 20px;">Hola, ${user_name}</h2>

        <p style="margin: 20px;">Gracias por completar tu registro en CYJLibrary.</p>

        <p style="margin: 20px;">Para activar tu cuenta, pulsa <a href="${message}" style="text-decoration: none; color: #000000;">aquí</a>.</p>
      </div>
    `, // html body
    });

    console.log("Message sent: %s", info.messageId);
  }
}

module.exports = mailer;
//cristian.mlg.94@hotmail.com
