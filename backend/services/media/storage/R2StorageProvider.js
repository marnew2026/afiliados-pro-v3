import {
  MediaStorageProvider,
} from "./MediaStorageProvider.js";

export class R2StorageProvider extends MediaStorageProvider {
  constructor({
    bucket,
    publicBaseUrl,
  }) {
    super();

    this.bucket = String(
      bucket || ""
    ).trim();

    this.publicBaseUrl = String(
      publicBaseUrl || ""
    )
      .trim()
      .replace(/\/+$/, "");

    if (!this.bucket) {
      throw new Error(
        "Bucket nao informado ao R2StorageProvider."
      );
    }

    if (!this.publicBaseUrl) {
      throw new Error(
        "URL publica nao informada ao R2StorageProvider."
      );
    }
  }

  async upload({
    key,
    body,
    contentType,
  }) {
    throw new Error(
      "R2StorageProvider.upload ainda nao implementado."
    );
  }

  async remove({
    key,
  }) {
    throw new Error(
      "R2StorageProvider.remove ainda nao implementado."
    );
  }

  getPublicUrl({
    key,
  }) {
    const cleanKey = String(
      key || ""
    )
      .trim()
      .replace(/^\/+/, "");

    if (!cleanKey) {
      throw new Error(
        "Key nao informada ao R2StorageProvider."
      );
    }

    return `${this.publicBaseUrl}/${cleanKey}`;
  }
}
