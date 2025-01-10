import { auth } from "@/auth";
import { customFetch } from "@/lib/api-client";
import { ApiResponse } from "@/types/auth";

export async function POST() {
  try {
    const session = await auth();
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const headers = {
      Authorization: `Bearer ${session.accessToken}`,
      "X-client-id": session.user.id,
    };

    const response = await customFetch.post<ApiResponse<null>>(
      "/api/v1/auth/logout",
      {},
      {
        headers: headers,
      }
    );

    return Response.json(response.data, { status: response.status || 200 });
  } catch (error: any) {
    const errorResponse: ApiResponse<null> = error?.json || {
      message: "Internal Server Error",
    };

    return Response.json(errorResponse, {
      status: errorResponse.status || 500,
    });
  }
}
