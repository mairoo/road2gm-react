export interface AuthSlice {
  accessToken: string | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  isInitialized: boolean; // 새로고침 중 체크
}

export interface User {
  email: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SetCredentialsPayload {
  data: LoginResponse;
  rememberMe?: boolean;
  isInitialized?: boolean;
}
