import * as z from "zod";
import type { ForgotPasswordSchema, LoginSchema } from "../schemas";

export interface AuthData {
  tokenExpiration: string;
  token: string;
  refreshToken: string;
  username: string;
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: string | null;
  username: string | null;
  role: string | null;
  fullName: string | null;
  userId: string | null;
  isAuthenticated: boolean;
}

export interface LoginData {
  tokenExpiration: string;
  token: string;
  refreshToken: string;
  username: string;
  role: string;
  fullName: string | null;
  userId: string | null;
}

export interface LoginRequest {
  emailAddress: string;
  password: string;
  rememberMe: boolean;
}

export interface StoredSession {
  token: string | null;
  refreshToken: string | null;
  tokenExpiration: string | null;
  username: string | null;
  role: string;
  fullName: string | null;
  userId: string | null;
}

export interface ChangePasswordRequest {
  key: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;
