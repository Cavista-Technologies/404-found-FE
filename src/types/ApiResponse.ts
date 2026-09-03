// import type { CalendarHoliday, CalendarLeave } from "./CalendarEvent";

export interface ApiResponse {
  message: string;
  isError: boolean;
  data: any;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  itemCount: number;
  pageLength: number;
  currentPage: number;
  pageCount: number;
  items: T[];
}

// export interface CalendarAPIResponse {
//   viewType: number;
//   month: number;
//   day: number;
//   weekStart: string;
//   weekEnd: string;
//   leaves: CalendarLeave[];
// }

// export interface CalendarHolidayAPIResponse {
//   viewType: number;
//   month: number;
//   day: number;
//   weekStart: string;
//   weekEnd: string;
//   holidays: CalendarHoliday[];
// }