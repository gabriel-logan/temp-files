import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

// Cache -> groups -> files
// Map<groupId, Array<{ buffer, filename, type, password }>>
const fileCache = new Map<
  string,
  Array<{
    buffer: Buffer;
    filename: string;
    type: string;
    password: string;
  }>
>();

// Parse multipart form-data
async function parseMultipart(req: NextRequest) {
  const formData = await req.formData();

  const password = formData.get("password")?.toString();

  if (!password) {
    throw new Error("password is required");
  }

  const files: File[] = [];
  formData.forEach((value, key) => {
    if (key === "files" && value instanceof File) {
      files.push(value);
    }
  });

  if (files.length === 0) {
    throw new Error("No files were uploaded");
  }

  const parsedFiles = await Promise.all(
    files.map(async (file) => ({
      buffer: Buffer.from(await file.arrayBuffer()),
      filename: file.name,
      type: file.type,
      password,
    })),
  );

  return parsedFiles;
}

// ----------------- UPLOAD (POST) -----------------
export async function POST(req: NextRequest) {
  try {
    const parsedFiles = await parseMultipart(req);

    // Create group UUID
    const groupId = randomUUID();

    fileCache.set(groupId, parsedFiles);

    return NextResponse.json({
      message: "Files uploaded successfully!",
      groupId,
      files: parsedFiles.length,
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
    const body = await req.json();
    const { groupId, password } = body;

    if (!groupId || !password) {
      return NextResponse.json(
        { error: "groupId and password are required" },
        { status: 400 },
      );
    }

    const files = fileCache.get(groupId);
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
      files: authorized.map((f) => f.filename),
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

  fileCache.delete(groupId);

  return NextResponse.json({
    message: `Group ${groupId} cleared`,
  });
}

export { fileCache };
