import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token ausente" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 PADRÃO GLOBAL DEFINITIVO
    req.user = {
      id: decoded.id.toString()
};

    if (!req.user.id) {
      return res.status(401).json({ message: "Token inválido (sem userId)" });
    }

    console.log("🔐 USER AUTH:", req.user.id);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};