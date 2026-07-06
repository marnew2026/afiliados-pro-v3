import jwt from "jsonwebtoken";

export function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token inválido" });
    }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = {
  id: decoded.id,
  role: decoded.role,
};

next();

  } catch (err) {
    console.log("AUTH ERROR:", err.message);
    return res.status(401).json({ error: "Não autenticado" });
  }
}