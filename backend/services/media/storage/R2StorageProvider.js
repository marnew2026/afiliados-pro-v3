import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import {
  MediaStorageProvider,
} from "./MediaStorageProvider.js";

export class R2StorageProvider extends MediaStorageProvider {
  constructor({
    bucket,
    publicBaseUrl,
    endpoint,
    accessKeyId,
    secretAccessKey,
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

    this.endpoint = String(
      endpoint || ""
    )
      .trim()
      .replace(/\/+$/, "");

    this.accessKeyId = String(
      accessKeyId || ""
    ).trim();

    this.secretAccessKey = String(
      secretAccessKey || ""
    ).trim();

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

    if (!this.endpoint) {
      throw new Error(
        "Endpoint nao informado ao R2StorageProvider."
      );
    }

    if (!this.accessKeyId) {
      throw new Error(
        "Access Key ID nao informado ao R2StorageProvider."
      );
    }

    if (!this.secretAccessKey) {
      throw new Error(
        "Secret Access Key nao informado ao R2StorageProvider."
      );
    }

    this.client = new S3Client({
      region: "auto",
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async upload({
    key,
    body,
    contentType,
  }) {
    const cleanKey = this.#normalizeKey(key);

    if (!body) {
      throw new Error(
        "Body nao informado ao R2StorageProvider.upload."
      );
    }

    const cleanContentType = String(
      contentType || ""
    ).trim();

    if (!cleanContentType) {
      throw new Error(
        "Content-Type nao informado ao R2StorageProvider.upload."
      );
    }

    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: cleanKey,
        Body: body,
        ContentType: cleanContentType,
      })
    );

    return {
      key: cleanKey,
      assetUrl: this.getPublicUrl({
        key: cleanKey,
      }),
    };
  }

  async remove({
    key,
  }) {
    const cleanKey = this.#normalizeKey(key);

    await this.client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: cleanKey,
      })
    );

    return {
      key: cleanKey,
      removed: true,
    };
  }

  getPublicUrl({
    key,
  }) {
    const cleanKey = this.#normalizeKey(key);

    return `${this.publicBaseUrl}/${cleanKey}`;
  }

  #normalizeKey(key) {
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

    return cleanKey;
  }
}
