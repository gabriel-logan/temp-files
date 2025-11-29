import { filesCache } from "@/lib/cache/file-cache";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    console.log("Received cron job request");
    console.log("Authorization Header:", authHeader);

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    filesCache.clear();

    return NextResponse.json(
      { message: "Cron job executed successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error executing cron job:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
