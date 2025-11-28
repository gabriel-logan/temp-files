import type { NextRequest } from "next/server";
import { StoredFile } from "../cache/file-cache";

export async function parseMultipart(req: NextRequest): Promise<StoredFile[]> {
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
