export async function publishInstagram({
  credential,
  destinationId,
  content,
}) {
  if (!credential) {
    throw new Error(
      "Credencial nao informada para InstagramAdapter."
    );
  }

  if (!destinationId) {
    throw new Error(
      "Destino nao informado para InstagramAdapter."
    );
  }

  if (!content) {
    throw new Error(
      "Conteudo nao informado para InstagramAdapter."
    );
  }

  if (content.channel !== "instagram") {
    throw new Error(
      `InstagramAdapter recebeu canal invalido: ${content.channel}`
    );
  }

  if (content.contentType !== "short_video") {
    throw new Error(
      "InstagramAdapter exige conteudo do tipo short_video."
    );
  }

  throw new Error(
    "InstagramAdapter ainda nao possui publicacao real implementada."
  );
}