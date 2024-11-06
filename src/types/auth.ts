export interface AuthSlice {
  isAuthenticated: boolean;
  rememberMe: boolean;
}

export interface User {
  email: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
}

export interface SetCredentialsPayload {
  data: LoginResponse;
  rememberMe?: boolean;
}
