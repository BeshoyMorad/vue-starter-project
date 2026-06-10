import type { LoginForm } from './schemas/login.schema';

export type LoginRequest = LoginForm;

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  employee: unknown;
}
