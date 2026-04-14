const prisma = require("../../lib/prisma");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

async function login(request, response) {
  try {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return response.status(404).json({
        error: "User with this email not found",
      });
    }

    const passwordChecking = await bcrypt.compare(password, user.password);

    if (!passwordChecking) {
      return response.status(400).json({
        error: "Password is incorrect",
      });
    }

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    response.json({
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log("Auth - Login:", error);
    response.status(500);
  }
}

module.exports = login;