export interface AuthSlice {
  accessToken: string | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SetCredentialsPayload {
  data: LoginResponse;
  rememberMe?: boolean;
}
