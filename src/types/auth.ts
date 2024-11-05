export interface AuthSlice {
  accessToken: string | null;
  isAuthenticated: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
