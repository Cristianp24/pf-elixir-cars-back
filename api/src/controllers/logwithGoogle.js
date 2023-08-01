const Clerk = require("@clerk/clerk-sdk-node/cjs/instance").default;

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

const logWithGoogle = (req, res) => {
  // Redirige al usuario a la página de autenticación de Google utilizando el SDK de Clerk
  const authUrl = clerk.authProvider.createAuthUrl("google");

  res.redirect(authUrl);
};

module.exports = logWithGoogle;
