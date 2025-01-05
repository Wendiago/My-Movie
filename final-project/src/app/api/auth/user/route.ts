import type { NextRequest } from "next/server";
export async function GET(request: NextRequest): Promise<Response> {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/authenticate`,
    {
      method: "GET",
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
      next: { revalidate: 15 * 60 },
      cache: "force-cache",
    }
  );
  return response;
}
