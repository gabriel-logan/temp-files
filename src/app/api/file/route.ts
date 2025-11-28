import { filesCache } from "@/lib/cache/file-cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { groupId, fileId, password } = await req.json();

    if (!groupId || !password || !fileId) {
      return NextResponse.json(
        { error: "groupId, fileId and password are required" },
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
