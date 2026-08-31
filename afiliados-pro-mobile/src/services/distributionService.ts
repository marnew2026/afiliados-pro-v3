import distributionApi from "./distributionApi";

export type CreateDistributionInput = {
  campaignId: string;
  destinationId: string;
  text: string;
  scheduledAt?: string;
};

export type CreateDistributionResponse = {
  success: boolean;
  distribution?: {
    _id: string;
    status: string;
    scheduledAt?: string;
  };
  queue?: {
    jobId?: string;
    publishAt?: string;
  };
  error?: string;
};

export async function createDistribution(
  input: CreateDistributionInput
) {
  const { data } =
    await distributionApi.post<CreateDistributionResponse>(
      "/distribution",
      input
    );

  return data;
}