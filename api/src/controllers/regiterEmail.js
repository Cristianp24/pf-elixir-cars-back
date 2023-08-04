const { emails } = require("../db");
const registerEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).send("Por favor ingresa un Email");
    }
    //formato de mail vailido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Email invalido");
    }
    //longitud del mail
    if (email.length > 50) {
      return res
        .status(400)
        .send("El email no puede tener mas de 50 caracteres");
    }

    const oldEmail = await emails.findOne({ where: { email } });

    if (oldEmail) {
      return res.status(409).send("Ya estas recibiendo nuestras noticias");
    }
    // Create Email in our database
    await emails.create({
      email: email.toLowerCase(), // sanitize: convert email to lowercase
    });
    res.status(200).json({ message: "Te has inscrito exitosamente!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = registerEmail;
