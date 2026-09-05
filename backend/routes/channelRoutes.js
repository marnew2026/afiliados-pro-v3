import express from "express";
import axios from "axios";

import { encryptCredential } from "../utils/credentialCrypto.js";
import ChannelConnection from "../models/ChannelConnection.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  completeInstagramOAuth,
  createInstagramAuthorizationUrl,
} from "../services/connections/InstagramOAuthService.js";

const router = express.Router();

router.get("/instagram/oauth/start", protect, async (req, res) => {
  try {
    const authorizationUrl = createInstagramAuthorizationUrl({
      userId: req.user._id,
    });

    return res.status(200).json({ success: true, authorizationUrl });
  } catch (error) {
    console.error("ERRO INSTAGRAM OAUTH START:", error.message);
    return res.status(500).json({
      success: false,
      error: "Nao foi possivel iniciar a conexao com o Instagram.",
    });
  }
});

router.get("/instagram/oauth/callback", async (req, res) => {
  try {
    if (req.query.error) {
      return res.status(400).send(
        "<h1>Conexao cancelada</h1><p>O Instagram nao foi conectado.</p>"
      );
    }

    const result = await completeInstagramOAuth({
      code: req.query.code,
      state: req.query.state,
    });

    const account = result.username ? `@${result.username}` : "sua conta";
    return res.status(200).send(
      `<h1>Instagram conectado</h1><p>${account} foi conectado com sucesso. Voce pode fechar esta janela.</p>`
    );
  } catch (error) {
    console.error("ERRO INSTAGRAM OAUTH CALLBACK:", error.message);
    return res.status(400).send(
      "<h1>Falha na conexao</h1><p>Nao foi possivel conectar o Instagram. Volte ao Afiliados Pro e tente novamente.</p>"
    );
  }
});

router.post("/telegram/connect", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const botToken = String(req.body.botToken || "").trim();
    const destinationId = String(
      req.body.destinationId || ""
    ).trim();

    const destinationName = String(
      req.body.destinationName || ""
    ).trim();

    if (!botToken) {
      return res.status(400).json({
        success: false,
        error: "Token do Telegram é obrigatório.",
      });
    }

    if (!destinationId) {
      return res.status(400).json({
        success: false,
        error: "destinationId é obrigatório.",
      });
    }

    // 1. Confirma que o token pertence a um bot válido.
    let bot;

    try {
      const response = await axios.get(
        `https://api.telegram.org/bot${botToken}/getMe`,
        {
          timeout: 15000,
        }
      );

      if (!response.data?.ok) {
        throw new Error("Telegram recusou o token.");
      }

      bot = response.data.result;
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: "Token do Telegram inválido.",
      });
    }

    // 2. Confirma que o destino realmente existe
    // e que esse bot consegue enxergá-lo.
    let telegramChat;

    try {
      const response = await axios.get(
        `https://api.telegram.org/bot${botToken}/getChat`,
        {
          params: {
            chat_id: destinationId,
          },
          timeout: 15000,
        }
      );

      if (!response.data?.ok) {
        throw new Error("Telegram recusou o destino.");
      }

      telegramChat = response.data.result;
    } catch (error) {
      return res.status(400).json({
        success: false,
        error:
          "Destino Telegram inválido ou inacessível para o bot.",
      });
    }

    // 3. Salva/atualiza a conexão deste usuário.
    const connection =
      await ChannelConnection.findOneAndUpdate(
        {
          userId,
          provider: "telegram",
          destinationId,
        },
        {
          $set: {
            destinationName:
              destinationName ||
              telegramChat.title ||
              telegramChat.username ||
              "",
            credential: encryptCredential(botToken),
            active: true,
            connectedAt: new Date(),
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      ).select("-credential");

    return res.status(200).json({
      success: true,

      bot: {
        id: bot.id,
        username: bot.username,
        name: bot.first_name,
      },

      destination: {
        id: String(telegramChat.id),
        name:
          telegramChat.title ||
          telegramChat.username ||
          destinationName,
        type: telegramChat.type,
      },

      connection,
    });
  } catch (error) {
    console.error(
      "ERRO TELEGRAM CONNECT:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Erro interno ao conectar Telegram.",
    });
  }
});
router.get("/", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const connections = await ChannelConnection.find({
      userId,
    })
      .select(
        "provider destinationId destinationName active connectedAt lastUsedAt createdAt updatedAt"
      )
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      total: connections.length,
      connections,
    });
  } catch (error) {
    console.error(
      "ERRO LIST CHANNEL CONNECTIONS:",
      error.message
    );

    return res.status(500).json({
      success: false,
      error: "Erro interno ao listar conexões.",
    });
  }
});
export default router;
