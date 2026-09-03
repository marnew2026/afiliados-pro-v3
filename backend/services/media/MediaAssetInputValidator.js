const MEDIA_FORMATS = {
  jpg: {
    type: "image",
    contentType: "image/jpeg",
  },
  jpeg: {
    type: "image",
    contentType: "image/jpeg",
  },
  png: {
    type: "image",
    contentType: "image/png",
  },
  webp: {
    type: "image",
    contentType: "image/webp",
  },
  mp4: {
    type: "video",
    contentType: "video/mp4",
  },
  webm: {
    type: "video",
    contentType: "video/webm",
  },
};

export function validateMediaAssetInput({
  type,
  extension,
  contentType,
}) {
  const cleanType = String(
    type || ""
  )
    .trim()
    .toLowerCase();

  const cleanExtension = String(
    extension || ""
  )
    .trim()
    .toLowerCase()
    .replace(/^\./, "");

  const cleanContentType = String(
    contentType || ""
  )
    .trim()
    .toLowerCase();

  const format =
    MEDIA_FORMATS[cleanExtension];

  if (!format) {
    throw new Error(
      "Formato de MediaAsset nao suportado."
    );
  }

  if (format.type !== cleanType) {
    throw new Error(
      "Tipo incompativel com extensao de MediaAsset."
    );
  }

  if (
    format.contentType !== cleanContentType
  ) {
    throw new Error(
      "contentType incompativel com extensao de MediaAsset."
    );
  }

  return {
    type: cleanType,
    extension: cleanExtension,
    contentType: cleanContentType,
  };
}
