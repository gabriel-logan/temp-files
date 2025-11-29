import { filesCache } from "@/lib/cache/file-cache";
import type {
  DownloadFilesResponse,
  DefaultErrorResponse,
  DownloadFilesRequest,
} from "@/lib/utils/types";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<DownloadFilesResponse | DefaultErrorResponse>> {
  try {
    const { groupId, password } = (await req.json()) as DownloadFilesRequest;

    if (typeof groupId !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "groupId and password must be strings" },
        { status: 400 },
      );
    }

    if (!groupId.trim() || !password.trim()) {
      return NextResponse.json(
        { error: "groupId and password cannot be empty" },
        { status: 400 },
      );
    }

    const files = filesCache.get(groupId);

    if (!files) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const authorized = files.filter((f) => f.password === password);
    if (authorized.length === 0) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 403 },
      );
    }

    if (authorized.length === 1) {
      const file = authorized[0];

      return NextResponse.json({
        message: "Single file",
        files: [{ fileId: file.fileId, filename: file.filename }],
        error: null,
      });
    }

    return NextResponse.json({
      message: "Multiple files available",
      files: authorized.map((f) => {
        return { fileId: f.fileId, filename: f.filename };
      }),
      error: null,
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
