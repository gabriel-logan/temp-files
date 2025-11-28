import { filesCache } from "@/lib/cache/file-cache";
import {
  DefaultErrorResponse,
  DeleteFileRequest,
  DeleteFileResponse,
  DownloadFileRequest,
  DownloadFileResponse,
} from "@/lib/utils/types";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<DownloadFileResponse | DefaultErrorResponse>> {
  try {
    const { groupId, fileId, password } =
      (await req.json()) as DownloadFileRequest;

    if (!groupId?.trim() || !password?.trim() || !fileId?.trim()) {
      return NextResponse.json(
        {
          error:
            "groupId, fileId and password are required and cannot be empty",
        },
        { status: 400 },
      );
    }

    const files = filesCache.get(groupId);

    if (!files) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const file = files.find(
      (f) => f.fileId === fileId && f.password === password,
    );

    if (!file) {
      return NextResponse.json(
        { error: "File not found or invalid password" },
        { status: 403 },
      );
    }

    return new NextResponse(new Uint8Array(file.buffer), {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename=\"${file.filename}\"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
): Promise<NextResponse<DeleteFileResponse | DefaultErrorResponse>> {
  try {
    const { groupId, fileId } = (await req.json()) as DeleteFileRequest;

    if (!groupId?.trim() || !fileId?.trim()) {
      return NextResponse.json(
        { error: "groupId and fileId are required and cannot be empty" },
        { status: 400 },
      );
    }

    const files = filesCache.get(groupId);

    if (!files) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    const remaining = files.filter((f) => f.fileId !== fileId);

    if (remaining.length === files.length) {
      return NextResponse.json(
        { error: "File not found in this group" },
        { status: 404 },
      );
    }

    if (remaining.length === 0) {
      filesCache.delete(groupId);

      return NextResponse.json({
        message: "File deleted and group was empty, so group removed",
        groupId,
      });
    }

    filesCache.set(groupId, remaining);

    return NextResponse.json({
      message: "File deleted successfully",
      groupId,
      fileId,
      remainingFiles: remaining.length,
    });
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
