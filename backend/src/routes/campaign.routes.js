import express from "express";
import {
  criarCampanha,
  listarCampanhas,
} from "../controllers/campanhaController.js";

const router = express.Router();

router.post("/", criarCampanha);
router.get("/", listarCampanhas);

export default router;