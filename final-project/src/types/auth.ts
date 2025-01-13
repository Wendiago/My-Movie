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
    image: string;
  };
  accessToken: string;
  refreshToken: string;
}

export type User = {
  _id: string;
  name?: string;
  email: string;
  image: string;
  isVerified: boolean;
};
