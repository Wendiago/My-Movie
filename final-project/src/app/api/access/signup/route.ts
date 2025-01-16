import { customFetch } from "@/lib/api-client";
import { ApiResponse } from "@/types/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const response = await customFetch.post<ApiResponse<null>>(
      "/api/v1/auth/signup",
      {
        email,
        password,
      }
    );

    return Response.json(response.data, { status: response.status || 200 });
  } catch (error: any) {
    return error;
  }
}
