import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

/* 
  TODO: pendiente mover estas funciones a una carpeta de middlewares
*/

const SECRET = process.env.SECRET;

//funcion para generar el token
export function generateToken(user) {
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
