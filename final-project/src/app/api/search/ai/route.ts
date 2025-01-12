import { auth } from "@/auth";
import { ApiResponse } from "@/types/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    if (!query) {
      return NextResponse.json(
        { message: "Query parameter is required" },
        { status: 400 }
      );
    }
    const session = await auth();
    const headers = {
      Authorization: session ? `Bearer ${session.accessToken}` : "",
      "X-client-id": session?.user.id || "",
    };

    // Call external API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/search/movie/navigate?query=${query}`,
      {
        method: "GET",
        headers,
        next: { tags: ["search-ai"] }, // Revalidation tag for caching
      }
    );

    return Response.json(response, { status: 200 });
  } catch (error: any) {
    const errorResponse: ApiResponse<null> = error?.json || {
      message: "Internal Server Error",
    };

    return Response.json(errorResponse, {
      status: errorResponse.status || 500,
    });
  }
}
