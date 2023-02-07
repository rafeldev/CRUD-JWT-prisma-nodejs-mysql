import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// creamos una nueva instancia de prisma client
const prisma = new PrismaClient();

const SECRET = process.env.SECRET;

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "email y password son obligatorios",
      });
    }

    //buscamos el usuario por email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //verificamos si el usuario existe
    if (user) {
      res.status(400).json({ status: 400, message: "usuario ya existe" });
    }

    //creamos el usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    res.status(201).json({ status: 201, message: "Usuario creado", newUser });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// funcion para iniciar sesion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "email y password son obligatorios",
      });
    }

    //buscamos el usuario por email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    //verificamos si el usuario existe
    if (!user) {
      res.status(400).json({ status: 400, message: "usuario no encontrado" });
    }

    // encriptamos la contraseña
    /* 
      FIXME: queda pendiente el cifrado de la contrasena
    */
    // const isPasswordValid = await compare(password, user.password);
    // console.log(password, "password");
    // console.log(user.password, "user.password");
    // console.log(isPasswordValid, "isPasswordValid");

    // //verificamos si la contraseña es valida
    // if (!isPasswordValid) {
    //   return res
    //     .status(400)
    //     .json({ status: 400, message: "password incorrecto" });
    // }

    const token = generateToken(user);
    res
      .header("Authorization", token)
      .json({ message: "Usuario autenticado", token, user });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

//funcion para generar el token
function generateToken(user) {
  const options = {
    expiresIn: "5min",
  };
  return jwt.sign(user, SECRET, options);
}

//funcion para verificar el token
export function verifyToken(req, res, next) {
  const token = req.headers["authorization"] || req.query.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "No autorizado, token no encontrado" });
  }

  //verificamos el token
  return jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ status: 401, message: "No autorizado, token no valido" });
    } else {
      req.user = user;
      return next();
    }
  });
}
