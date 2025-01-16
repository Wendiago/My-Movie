import { auth } from "@/auth";
import httpMethods from "@/lib/https";
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

    const response = await httpMethods.post<ApiResponse<null>>(
      "/api/v1/auth/logout",
      {},
      headers
    );
    return Response.json(response.data, { status: response.status || 200 });
  } catch (error: any) {
    const errorResponse: ApiResponse<null> = error?.json || {
      message: "Internal Server Error",
    };
    //console.log(errorResponse);
    if (
      errorResponse.code === 1000102 ||
      errorResponse.message === "User not found"
    ) {
      return Response.json(
        { message: "User not found, considered logged out" },
        { status: 200 }
      );
    }
    return Response.json(errorResponse, {
      status: 500,
    });
  }
}
