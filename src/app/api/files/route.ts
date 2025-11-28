import { filesCache } from "@/lib/cache/file-cache";
import { parseMultipart } from "@/lib/utils/parse-multipart";
import { DownloadRequest } from "@/lib/utils/types";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

// ----------------- UPLOAD (POST) -----------------
export async function POST(req: NextRequest) {
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
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 400 },
    );
  }
}

// ----------------- DOWNLOAD (GET) -----------------
export async function GET(req: NextRequest) {
  try {
    const { groupId, password } = (await req.json()) as DownloadRequest;

    if (!groupId?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: "groupId and password are required and cannot be empty" },
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
      return new NextResponse(new Uint8Array(file.buffer), {
        headers: {
          "Content-Type": file.type,
          "Content-Disposition": `attachment; filename="${file.filename}"`,
        },
      });
    }

    return NextResponse.json({
      message: "Multiple files available",
      files: authorized.map((f) => {
        return { fileId: f.fileId, filename: f.filename };
      }),
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

// ----------------- CLEAR (DELETE) -----------------
export async function DELETE(req: NextRequest) {
  const { groupId } = await req.json();

  if (!groupId) {
    return NextResponse.json({ error: "groupId is required" }, { status: 400 });
  }

  filesCache.delete(groupId);

  return NextResponse.json({
    message: `Group ${groupId} cleared`,
  });
}
