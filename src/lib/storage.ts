import type { StoredSession } from "@/types/Authentication";

const KEYS = {
  authToken: "authToken",
  refreshToken: "refreshToken",
  tokenExpiration: "tokenExpiration",
  username: "username",
  role: "role",
  fullName: "fullName",
} as const;


type StorageKey = (typeof KEYS)[keyof typeof KEYS];

function getStorage(rememberMe: boolean): Storage {
  return rememberMe ? localStorage : sessionStorage;
}

function readFromEither(key: StorageKey): string | null {
  return localStorage.getItem(key) ?? sessionStorage.getItem(key);
}

export function loadSession(): StoredSession {
  return {
    token: readFromEither(KEYS.authToken),
    refreshToken: readFromEither(KEYS.refreshToken),
    tokenExpiration: readFromEither(KEYS.tokenExpiration),
    username: readFromEither(KEYS.username),
    role: JSON.parse(readFromEither(KEYS.role) ?? "[]"),
    fullName: readFromEither(KEYS.fullName),
  };
}



export function saveSession(
  data: {
    token: string;
    refreshToken: string;
    tokenExpiration: string;
    username: string;
    role: string;
  },
  rememberMe: boolean
): void {
  const storage = getStorage(rememberMe);

  storage.setItem(KEYS.authToken, data.token);
  storage.setItem(KEYS.refreshToken, data.refreshToken);
  storage.setItem(KEYS.tokenExpiration, data.tokenExpiration);
  storage.setItem(KEYS.username, data.username);
  storage.setItem(KEYS.role, JSON.stringify(data.role));
}

export function clearSession(): void {
  Object.values(KEYS).forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

