// EXTERNAL
const { Role } = require("@prisma/client");
const bcrypt = require("bcrypt");
// LOCAL
const prisma = require("../db");

const registerAdmin = async (request, response) => {
  const { body: { first_name, last_name, username, password } } = request;

  try {
    const admins = await prisma.users.findMany({
      where: { role: Role.ADMIN, active_flag: true },
      select: { id: true, username: true, active_flag: true },
    });

    if (admins?.length > 0) {
      return response.status(400).json({
        success: false,
        error: "there is already a registered administrator",
      });
    }

    if (!password) {
      return response
        .status(400)
        .json({ success: false, error: "missing param 'password'" });
    }

    if (password.length < 4) {
      return response
        .status(400)
        .json({ success: false, error: "password min length is 4" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.users.create({
      data: {
        first_name: first_name || "admin",
        last_name: last_name || "admin",
        username: username || "admin",
        password: hashPassword,
        role: Role.ADMIN
      },
    });
    const { password: pw, ...restNewAdmin } = newAdmin;

    return response.status(201).json({ success: true, data: restNewAdmin });
  } catch (e) {
    let error = "";
    if (e.code === "P2002") {
      error = `The username '${username || "admin"}' already exists`;
    } else {
      error = e.message;
    }
    console.log(error);
    return response.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { registerAdmin };
