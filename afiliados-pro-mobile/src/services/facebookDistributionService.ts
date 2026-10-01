import distributionApi from "./distributionApi";

export type FacebookReviewOption = {
  campaignId: string;
  mediaAssetId: string;
  campaignName: string;
  videoCreatedAt?: string;
};

export type FacebookReviewOptionsResponse = {
  connected: boolean;
  connection: {
    destinationName: string;
    connectedAt?: string;
  } | null;
  options: FacebookReviewOption[];
  error?: string;
};

export type CreateFacebookReelInput = {
  campaignId: string;
  mediaAssetId: string;
  caption: string;
  hashtags?: string[];
  cta?: string;
};

export type CreateFacebookReelResponse = {
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

export async function getFacebookReviewOptions() {
  const { data } =
    await distributionApi.get<FacebookReviewOptionsResponse>(
      "/distribution/facebook/options"
    );

  return data;
}

export async function createFacebookReel(
  input: CreateFacebookReelInput
) {
  const { data } =
    await distributionApi.post<CreateFacebookReelResponse>(
      "/distribution/facebook",
      input
    );

  return data;
}
