import { refreshTokenApi } from "@/services/auth.service";

export function decodeJwtPayload<T = Record<string, unknown>>(token: string): T | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}


let refreshTokenTimer: ReturnType<typeof setTimeout> | null = null;
// Schedule automatic token refresh
export const scheduleTokenRefresh = (tokenExpiration: string): void => {
  // Clear any existing timer
  if (refreshTokenTimer) {
    clearTimeout(refreshTokenTimer);
  }

  const timeUntilRefresh = getTimeUntilRefresh(tokenExpiration);


  refreshTokenTimer = setTimeout(async () => {
    try {
    
      const result = await refreshTokenApi();

      // Schedule next refresh
      scheduleTokenRefresh(result.tokenExpiration);

      // Dispatch event for other parts of app to listen to
      window.dispatchEvent(
        new CustomEvent("tokenRefreshed", { detail: result }),
      );
    } catch (error) {
     

      // Dispatch event to trigger logout
      window.dispatchEvent(new CustomEvent("tokenRefreshFailed"));
    }
  }, timeUntilRefresh);
};

// Calculate time until token refresh (1 minutes before expiration)
export const getTimeUntilRefresh = (tokenExpiration: string): number => {
  const expirationTime = new Date(tokenExpiration).getTime();
  const currentTime = Date.now();
  const timeUntilExpiry = expirationTime - currentTime;

  // Refresh 1 minutes before expiration, or immediately if less than 5 minutes remain
  const bufferTime = 1 * 60 * 1000; // 1 minutes in milliseconds
  const refreshTime = timeUntilExpiry - bufferTime;

  return Math.max(refreshTime, 0);
};
