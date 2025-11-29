import type { NextRequest } from "next/server";
import { StoredFile } from "../cache/file-cache";
import { randomUUID } from "node:crypto";

export async function parseMultipart(req: NextRequest): Promise<StoredFile[]> {
  const formData = await req.formData();

  console.log("Form Data:", formData);

  const password = formData.get("password")?.toString();

  if (!password?.trim()) {
    throw new Error("password is required and cannot be empty");
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
      fileId: randomUUID(),
      buffer: Buffer.from(await file.arrayBuffer()),
      filename: file.name,
      type: file.type,
      password,
    })),
  );

  return parsedFiles;
}
