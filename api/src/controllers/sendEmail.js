const sgMail = require("@sendgrid/mail");

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  console.log(req.body);

  const msg = {
    to,
    from: "al3jandrocan0n@gmail.com",
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Correo electrónico enviado con éxito." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Hubo un error al enviar el correo electrónico." });
  }
};

module.exports = sendEmail;
