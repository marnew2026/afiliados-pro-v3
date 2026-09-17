import express from "express";
import axios from "axios";

import { encryptCredential } from "../utils/credentialCrypto.js";
import ChannelConnection from "../models/ChannelConnection.js";
import { protect } from "../middlewares/authMiddleware.js";
import {
  completeInstagramOAuth,
  createInstagramAuthorizationUrl,
} from "../services/connections/InstagramOAuthService.js";
import {
  uploadManualVideo,
} from "../services/media/ManualVideoUploadService.js";
import {
  completeFacebookOAuth,
  createFacebookAuthorizationUrl,
} from "../services/connections/FacebookOAuthService.js";
import {
  completeTikTokOAuth,
  createTikTokAuthorizationUrl,
} from "../services/connections/TikTokOAuthService.js";
import { decryptCredential } from "../utils/credentialCrypto.js";
import { queryTikTokCreatorInfo } from "../services/connections/TikTokCreatorInfoService.js";

const router = express.Router();

router.get("/tiktok/creator-info", protect, async (req, res) => {
  try {
    const connection = await ChannelConnection.findOne({
      userId: req.user._id,
      provider: "tiktok",
      active: true,
    }).select("+credential");
    if (!connection) return res.status(404).json({ success: false, error: "Conexao ativa do TikTok nao encontrada." });
    const creator = await queryTikTokCreatorInfo({ credential: decryptCredential(connection.credential) });
    return res.status(200).json({ success: true, creator });
  } catch (error) {
    console.error("ERRO TIKTOK CREATOR INFO:", error.message);
    return res.status(502).json({ success: false, error: "Nao foi possivel consultar as opcoes atuais da conta TikTok." });
  }
});

router.get("/tiktok/oauth/start", protect, async (req, res) => {
  try {
    const authorizationUrl = createTikTokAuthorizationUrl({
      userId: req.user._id,
    });
    return res.status(200).json({ success: true, authorizationUrl });
  } catch (error) {
    console.error("ERRO TIKTOK OAUTH START:", error.message);
    return res.status(500).json({
      success: false,
      error: "Nao foi possivel iniciar a conexao com o TikTok.",
    });
  }
});

router.get("/tiktok/oauth/callback", async (req, res) => {
  try {
    if (req.query.error) {
      return res.status(400).send(
        "<h1>Conexao cancelada</h1><p>O TikTok nao foi conectado.</p>"
      );
    }
    const result = await completeTikTokOAuth({
      code: req.query.code,
      state: req.query.state,
    });
    const safeName = String(result.displayName || "Conta TikTok")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
    return res.status(200).send(
      `<h1>TikTok conectado</h1><p>${safeName} foi conectado com sucesso. Voce pode fechar esta janela.</p>`
    );
  } catch (error) {
    console.error("ERRO TIKTOK OAUTH CALLBACK:", error.message);
    return res.status(400).send(
      "<h1>Falha na conexao</h1><p>Nao foi possivel conectar o TikTok. Volte ao Afiliados Pro e tente novamente.</p>"
    );
  }
});

router.get("/facebook/oauth/start", protect, async (req, res) => {
  try {
    const authorizationUrl = createFacebookAuthorizationUrl({
      userId: req.user._id,
    });

    return res.status(200).json({ success: true, authorizationUrl });
  } catch (error) {
    console.error("ERRO FACEBOOK OAUTH START:", error.message);
    return res.status(500).json({
      success: false,
      error: "Nao foi possivel iniciar a conexao com o Facebook.",
    });
  }
});

router.get("/facebook/oauth/callback", async (req, res) => {
  try {
    if (req.query.error) {
      return res.status(400).send(
        "<h1>Conexao cancelada</h1><p>O Facebook nao foi conectado.</p>"
      );
    }

    const result = await completeFacebookOAuth({
      code: req.query.code,
      state: req.query.state,
    });
    const safePageName = String(result.pageName || "Pagina")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

    return res.status(200).send(
      `<h1>Facebook conectado</h1><p>${safePageName} foi conectada com sucesso. Voce pode fechar esta janela.</p>`
    );
  } catch (error) {
    console.error("ERRO FACEBOOK OAUTH CALLBACK:", error.message);
    return res.status(400).send(
      "<h1>Falha na conexao</h1><p>Nao foi possivel conectar a Pagina do Facebook. Volte ao Afiliados Pro e tente novamente.</p>"
    );
  }
});

router.post(
  "/instagram/media-upload/:campaignId",
  protect,
  express.raw({ type: "video/mp4", limit: "20mb" }),
  async (req, res) => {
    try {
      const mediaAsset = await uploadManualVideo({
        userId: req.user._id,
        campaignId: req.params.campaignId,
        body: req.body,
      });

      return res.status(201).json({
        success: true,
        mediaAsset: {
          id: mediaAsset._id,
          campaignId: mediaAsset.campaignId,
          type: mediaAsset.type,
          status: mediaAsset.status,
          assetUrl: mediaAsset.assetUrl,
          source: mediaAsset.source,
        },
      });
    } catch (error) {
      console.error("ERRO INSTAGRAM MEDIA UPLOAD:", error.message);

      return res.status(error.statusCode || 500).json({
        success: false,
        error:
          error.statusCode
            ? error.message
            : "Nao foi possivel enviar o video.",
      });
    }
  }
);

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

    const account = String(
      result.username ? `@${result.username}` : "sua conta"
    )
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
    return res.status(200).send(
      `<h1>Instagram conectado</h1><p>${account} foi conectado com sucesso.</p><p><a href="/instagram-review">Voltar ao Afiliados Pro</a></p>`
    );
  } catch (error) {
    console.error("ERRO INSTAGRAM OAUTH CALLBACK:", error.message);
    return res.status(400).send(
      '<h1>Falha na conexao</h1><p>Nao foi possivel conectar o Instagram.</p><p><a href="/instagram-review">Voltar ao Afiliados Pro</a></p>'
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
