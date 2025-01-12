import { auth } from "@/auth";

export async function GET() {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 200 });
  }

  return Response.json(session.user, { status: 200 });
}
