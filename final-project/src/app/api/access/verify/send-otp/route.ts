import { customFetch } from "@/lib/api-client";
import { ApiResponse } from "@/types/auth";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const response = await customFetch.post<ApiResponse<any>>(
      "/api/v1/auth/verify/send-otp",
      {
        email,
      }
    );

    return Response.json(response.data, { status: response.status || 200 });
  } catch (error: any) {
    console.log(error);
    const errorResponse: ApiResponse<null> = error?.json || {};
    return Response.json(errorResponse, {
      status: errorResponse.status || 500,
    });
  }
}
