import { customFetch } from "@/lib/api-client";
import { ApiResponse } from "@/types/auth";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const response = await customFetch.post<ApiResponse<any>>(
      "/api/v1/auth/reset-password/send-otp",
      {
        email,
      }
    );

    return Response.json(response);
  } catch (error: any) {
    const errorResponse: ApiResponse<null> = error?.json || {};
    return Response.json(errorResponse);
  }
}
