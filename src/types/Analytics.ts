export interface ConversionTableValues {
  source: number;
  sourceStr: string;
  applied: number;
  hired: number;
  conversionRate: number;
}

export interface ConversionByChannelResponse {
  channels: ConversionTableValues[];
  insight: string | null; // adjust if insight has a real shape later
}