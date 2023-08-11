const { verify } = require("jsonwebtoken");
const { serialize } = require("cookie");
const logOutUser = (req, res) => {
  const { userToken } = req.cookies;
  console.log("Este beria ser el token" + userToken);
  if (!userToken) {
    return res.status(401).json({ error: "no token" });
  }
  try {
    verify(userToken, "secret");
    const serialized = serialize("userToken", null, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });
<<<<<<< HEAD
    // res.setHeader("Set-Cookie", serialized);
=======
    res.setHeader("Set-Cookie", serialized);
>>>>>>> e35d5047377992dee33d5aafaf9975bfe117dfa1
    res.status(200).json("Hasta pronto!");
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
};

module.exports = logOutUser;
