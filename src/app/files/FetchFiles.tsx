"use client";

import { fetchFilesAction } from "@/actions";
import { useActionState, useState } from "react";

export default function FetchFiles() {
  const [files, formAction, isFetching] = useActionState(
    fetchFilesAction,
    null,
  );

  const [groupId, setGroupId] = useState("");
  const [password, setPassword] = useState("");

  async function downloadFile(fileId: string) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/file`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          fileId,
          password,
        }),
      },
    );

    if (!response.ok) {
      console.error("Failed to download file");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const contentDisposition = response.headers.get("Content-Disposition");
    let filename = "downloaded_file";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <form
        action={formAction}
        className="mt-6 flex w-full max-w-md flex-col gap-4"
      >
        <label className="text-lg font-medium">Enter File Group ID:</label>
        <input
          type="text"
          name="groupId"
          placeholder="Group ID"
          className="w-full rounded border p-2"
          required
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />

        <label className="text-lg font-medium">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded border p-2"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={isFetching}
          className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${isFetching && "animate-pulse"}`}
        >
          {isFetching ? "Fetching..." : "Fetch Files"}
        </button>
      </form>

      <ul className="mt-6 w-full max-w-md space-y-4 p-4">
        {files ? (
          files.map((file) => (
            <button
              key={file.fileId}
              className="w-full cursor-pointer"
              onClick={() => downloadFile(file.fileId)}
            >
              <li className="w-full rounded-lg border p-4">
                <h2 className="text-2xl font-semibold">{file.filename}</h2>
              </li>
            </button>
          ))
        ) : (
          <li className="w-full rounded-lg border p-4">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No files found.
            </p>
          </li>
        )}
      </ul>
    </>
  );
}
