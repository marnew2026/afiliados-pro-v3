import distributionApi from "./distributionApi";

export type TikTokReviewOption = {
  campaignId: string;
  mediaAssetId: string;
  campaignName: string;
  videoCreatedAt?: string;
};

export type TikTokReviewOptionsResponse = {
  success: boolean;
  connected: boolean;
  connection: {
    destinationName: string;
    connectedAt?: string;
  } | null;
  options: TikTokReviewOption[];
  error?: string;
};

export type CreateTikTokDraftInput = {
  campaignId: string;
  mediaAssetId: string;
  caption: string;
};

export type CreateTikTokDraftResponse = {
  success: boolean;
  requiresUserAction?: boolean;
  nextStep?: string;
  distribution?: {
    id: string;
    channel: string;
    status: string;
    scheduledAt?: string;
  };
  error?: string;
};

export async function getTikTokReviewOptions() {
  const { data } =
    await distributionApi.get<TikTokReviewOptionsResponse>(
      "/distribution/tiktok/options"
    );

  return data;
}

export async function createTikTokDraft(
  input: CreateTikTokDraftInput
) {
  const { data } =
    await distributionApi.post<CreateTikTokDraftResponse>(
      "/distribution/tiktok/draft",
      input
    );

  return data;
}
