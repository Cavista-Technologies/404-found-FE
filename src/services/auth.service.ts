import type {
  ChangePasswordRequest,
  LoginData,
  LoginRequest
} from "@/types/Authentication";
import { httpClient } from "./httpClient";
import { decodeJwtPayload } from "@/lib/jwt";
import { loadSession, saveSession } from "@/lib/storage";

export const authService = {
  login: async (body: LoginRequest) => {
    const response = await httpClient.post<LoginData, LoginRequest>(
      "/auth/login",
      body,
      {
        returnFullEnvelope: true,
      },
    );

    if (!response.data) {
      return response;
    }

    const decoded = decodeJwtPayload<{
      FullName: string;
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
    }>(response.data.token);

    return {
      ...response,
      data: {
        ...response.data,
        fullName:
          decoded?.[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ] ?? null,
      },
    };
  },

  changePassword: (body: ChangePasswordRequest) =>
    httpClient.post<null, ChangePasswordRequest>(
      "/auth/change-password",
      body,
      { returnFullEnvelope: true },
    ),

  forgotPassword: (body: { email: string }) =>
    httpClient.post<null, { email: string }>("/auth/forgot-password", body, {
      returnFullEnvelope: true,
    }),
};

export const refreshTokenApi = async (): Promise<any> => {
  const session = loadSession();
  const currentRefreshToken = session.refreshToken;
  const currentToken = session.token;

  if (!currentToken || !currentRefreshToken) {
    throw new Error("No tokens available for refresh");
  }

  const response = await httpClient.post<LoginData>(
    "/auth/refresh-token",
    { refreshToken: currentRefreshToken, accessToken: currentToken },
    { returnFullEnvelope: true },
  );
  if (!response.data) return;

  const decoded = decodeJwtPayload<{
    FullName: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  }>(response.data.token);

  const mergedData = {
    ...response.data,
    fullName:
      decoded?.[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
      ] ?? null,
  };

  saveSession(mergedData, true);   // ✅ now persists fullName too

  return {
    ...response,
    data: mergedData,
  };
};