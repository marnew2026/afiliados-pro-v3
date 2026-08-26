import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {

   

    const authHeader = req.headers.authorization;

    
    if (!authHeader) {
      return res.status(401).json({
        error: "Token não enviado",
      });
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();

    
   
    

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("🔥 JWT VALIDADO");
    

    const user = await User.findById(decoded.id);
    

    if (!user) {
      console.log("❌ USUÁRIO DO JWT NÃO ENCONTRADO");

      return res.status(401).json({
        error: "Usuário não encontrado",
      });
    }

    req.user = user;
 

    

    next();

  } catch (err) {
    console.log("❌ JWT ERROR NAME:", err.name);
   

    return res.status(401).json({
      error: "Token inválido",
    });
  }
}