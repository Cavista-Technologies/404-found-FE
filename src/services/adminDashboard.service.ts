import type {
  AdminSnapshotStatistics,
  CandidateFunnel,
  TimeToFillTrends,
} from "@/types/AdminDashboard";
import { httpClient } from "./httpClient";
import type { ConversionTableValues } from "@/types/Analytics";

export const fetchDashboardSnapshotStatistics =
  async (): Promise<AdminSnapshotStatistics> => {
    const response = await httpClient.get<AdminSnapshotStatistics>(
      "/dashboard/snapshot",
    );
    return response;
  };

export const fetchDashboardTimeToFillTrends =
  async (): Promise<TimeToFillTrends> => {
    const response = await httpClient.get<TimeToFillTrends>(
      "/dashboard/time-to-fill",
    );
    return response;
  };

export const fetchCandidateFunnelStatistics =
  async (): Promise<CandidateFunnel> => {
    const response = await httpClient.get<CandidateFunnel>("/dashboard/funnel");
    return response;
  };

export const fetchConversionByChannel =
  async (): Promise<ConversionTableValues> => {
    const response = await httpClient.get<ConversionTableValues>(
      `/dashboard/conversion-by-channel`,
    );
    return response;
  };
