"use server";

import { StoredFile } from "@/lib/cache/file-cache";

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
