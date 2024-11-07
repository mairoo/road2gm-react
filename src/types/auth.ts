export interface AuthSlice {
  user: User | null;
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

export interface LoginResponse extends User {}

export interface SetCredentialsPayload {
  data: LoginResponse;
  rememberMe?: boolean;
}
