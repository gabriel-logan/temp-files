import { filesCache } from "@/lib/cache/file-cache";
import { parseMultipart } from "@/lib/utils/parse-multipart";
import type {
  DefaultErrorResponse,
  DeleteFilesRequest,
  DeleteFilesResponse,
  UploadFilesResponse,
} from "@/lib/utils/types";
import { type NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<UploadFilesResponse | DefaultErrorResponse>> {
  try {
    const files = await parseMultipart(req);

    const groupId = randomUUID();

    filesCache.set(groupId, files);

    return NextResponse.json({
      message: "Files uploaded successfully",
      groupId,
      files: files.map((f) => ({
        fileId: f.fileId,
        filename: f.filename,
        type: f.type,
      })),
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 400 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
): Promise<NextResponse<DeleteFilesResponse | DefaultErrorResponse>> {
  const { groupId, password } = (await req.json()) as DeleteFilesRequest;

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

  const authorized = files.find((f) => f.password === password);
  if (!authorized) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 403 });
  }

  filesCache.delete(groupId);

  return NextResponse.json({
    message: `Group ${groupId} cleared`,
  });
}
