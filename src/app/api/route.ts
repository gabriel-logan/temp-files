import { NextRequest, NextResponse } from "next/server";

// Cache -> groups -> files
// Map<groupId, Array<{ buffer, filename, type, password }>>
const fileCache = new Map<
  string, // group
  Array<{
    buffer: Buffer;
    filename: string;
    type: string;
    password: string;
  }>
>();

// Parse multipart form-data (multiple files)
async function parseMultipart(req: NextRequest) {
  const formData = await req.formData();

  const group = formData.get("group")?.toString();
  const password = formData.get("password")?.toString();

  if (!group || !password) {
    throw new Error("group and password are required");
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

  return { group, files: parsedFiles };
}

// ----------------- UPLOAD -----------------
export async function POST(req: NextRequest) {
  try {
    const { group, files } = await parseMultipart(req);

    if (!fileCache.has(group)) fileCache.set(group, []);

    const groupFiles = fileCache.get(group)!;

    groupFiles.push(...files);

    return NextResponse.json({
      message: "Files uploaded successfully!",
      group,
      count: files.length,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unexpected error" },
      { status: 400 },
    );
  }
}

// ----------------- CLEAR GROUP CACHE -----------------
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const group = searchParams.get("group");

  if (!group) {
    return NextResponse.json({ error: "group is required" }, { status: 400 });
  }

  fileCache.delete(group);

  return NextResponse.json({ message: `Cache for group ${group} cleared!` });
}

// ----------------- DOWNLOAD -----------------
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const group = searchParams.get("group");
  const password = searchParams.get("password");

  if (!group || !password) {
    return NextResponse.json(
      { error: "group and password are required" },
      { status: 400 },
    );
  }

  const groupFiles = fileCache.get(group);

  if (!groupFiles || groupFiles.length === 0) {
    return NextResponse.json(
      { error: "No files found in this group" },
      { status: 404 },
    );
  }

  const authorizedFiles = groupFiles.filter((f) => f.password === password);

  if (authorizedFiles.length === 0) {
    return NextResponse.json(
      { error: "Incorrect password or no permission" },
      { status: 403 },
    );
  }

  // If there's only one file, download directly
  if (authorizedFiles.length === 1) {
    const file = authorizedFiles[0];

    return new NextResponse(new Uint8Array(file.buffer), {
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `attachment; filename="${file.filename}"`,
      },
    });
  }

  // If multiple files, return a list (can create zip later)
  return NextResponse.json({
    message: "Multiple files available",
    files: authorizedFiles.map((f) => f.filename),
  });
}

export { fileCache };
