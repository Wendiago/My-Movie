export interface ApiResponse<T> {
  status: number;
  message: string;
  code: number;
  data?: T;
  errorStack?: string;
}

export interface LoginReponse {
  user: {
    id: string;
    email: string;
    name: string;
    photo: string;
  };
  accessToken: string;
  refreshToken: string;
}

export type User = {
  _id: string;
  name?: string;
  email: string;
  photo: string;
  isVerified: boolean;
};
