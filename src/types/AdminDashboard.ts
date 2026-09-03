export interface AdminSnapshotStatistics {
  openRoles: number;
  rolesFilledThisQuarter: number;
  averageTimeToFillDays: number;
  timeToFillDeltaVsLastMonth: number;
  atRiskCount: number;
}

export interface MonthlyTrend {
  [key: string]: string | number;
  month: string;
  averageDays: number;
}

export interface DepartmentTrend {
  [key: string]: string | number;
  department: string;
  averageDays: number;
}

export interface TimeToFillTrends {
  monthlyTrend: MonthlyTrend[];
  byDepartment: DepartmentTrend[];
}

export interface CandidateFunnel {
  applicants: number;
  screened: number;
  interviewed: number;
  offers: number;
  hires: number;
}
