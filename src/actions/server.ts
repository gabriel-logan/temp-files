"use server";

import { StoredFile } from "@/lib/cache/file-cache";
import type { UploadFilesResponse } from "@/lib/utils/types";

export async function fetchFilesAction(
  _: StoredFile[] | null,
  formData: FormData,
) {
  const groupId = formData.get("groupId");
  const password = formData.get("password");

  try {
    if (typeof groupId !== "string" || typeof password !== "string") {
      throw new Error("Invalid form data");
    }

    if (groupId.trim().length !== 36) {
      throw new Error("Invalid group ID, must be a valid UUID v4");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/files/get-files`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          password,
        }),
      },
    );

    const data = (await response.json()) as {
      files: StoredFile[];
    };

    return data.files ?? null;
  } catch (error) {
    console.error("Error fetching files:", error);

    return null;
  }
}

export async function sendFilesAction(
  _: UploadFilesResponse | null,
  formData: FormData,
) {
  try {
    const files = formData.getAll("files");
    const password = formData.get("password");

    const payload = new FormData();

    files.forEach((file) => {
      if (file instanceof Blob) {
        payload.append("files", file);
      }
    });

    if (typeof password === "string") {
      payload.append("password", password);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/files`,
      {
        method: "POST",
        body: payload,
      },
    );

    const data = (await response.json()) as UploadFilesResponse;

    return data;
  } catch (error) {
    console.error("Error uploading files:", error);

    return null;
  }
}
