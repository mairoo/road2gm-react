export namespace Auth {
  // 기본 사용자 정보 타입
  export interface User {
    email: string;
    username: string;
  }

  // API 요청/응답 관련 타입
  export interface LoginRequest {
    email: string;
    password: string;
    rememberMe: boolean;
  }

  export interface LoginResponse {
    accessToken: string;
  }

  export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
  }

  export interface SignUpResponse extends User {}

  // Redux 관련 타입
  export namespace State {
    export interface AuthSlice {
      accessToken: string | null;
      isAuthenticated: boolean;
      rememberMe: boolean;
      isInitialized: boolean; // 새로고침 중 체크
    }

    export interface SetCredentialsPayload {
      data: Auth.LoginResponse;
      rememberMe?: boolean;
    }
  }
}
