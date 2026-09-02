export class MediaStorageProvider {
  async upload({
    key,
    body,
    contentType,
  }) {
    throw new Error(
      "MediaStorageProvider.upload nao implementado."
    );
  }

  async remove({
    key,
  }) {
    throw new Error(
      "MediaStorageProvider.remove nao implementado."
    );
  }

  getPublicUrl({
    key,
  }) {
    throw new Error(
      "MediaStorageProvider.getPublicUrl nao implementado."
    );
  }
}
