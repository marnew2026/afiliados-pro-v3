import distributionApi from "./distributionApi";

export type InstagramReviewOption = {
  campaignId: string;
  mediaAssetId: string;
  campaignName: string;
  videoCreatedAt?: string;
};

export type InstagramReviewOptionsResponse = {
  connected: boolean;
  connection: {
    destinationName: string;
    connectedAt?: string;
  } | null;
  options: InstagramReviewOption[];
  error?: string;
};

export type CreateInstagramReelInput = {
  campaignId: string;
  mediaAssetId: string;
  caption: string;
  hashtags?: string[];
  cta?: string;
};

export type CreateInstagramReelResponse = {
  success: boolean;
  distribution?: {
    id: string;
    channel?: string;
    source?: string;
    status?: string;
    scheduledAt?: string;
  };
  error?: string;
};

export async function getInstagramReviewOptions() {
  const { data } =
    await distributionApi.get<InstagramReviewOptionsResponse>(
      "/distribution/instagram/options"
    );

  return data;
}

export async function createInstagramReel(
  input: CreateInstagramReelInput
) {
  const { data } =
    await distributionApi.post<CreateInstagramReelResponse>(
      "/distribution/instagram",
      input
    );

  return data;
}
