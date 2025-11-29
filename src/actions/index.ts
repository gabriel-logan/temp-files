"use server";

import { StoredFile } from "@/lib/cache/file-cache";
import type { UploadFilesResponse } from "@/lib/utils/types";

export async function fetchFilesAction(
  _: StoredFile[] | null,
  formData: FormData,
) {
  const groupId = formData.get("groupId");
  const password = formData.get("password");

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
    files?: StoredFile[];
  };

  return data.files ?? null;
}

export async function sendFilesAction(
  _: UploadFilesResponse,
  formData: FormData,
) {
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
}
