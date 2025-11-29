"use client";

import { sendFilesAction } from "@/actions";
import { useActionState } from "react";

export default function SendFiles() {
  const [filesSended, formAction] = useActionState(sendFilesAction, {
    files: [],
    groupId: "",
    message: "",
  });

  return (
    <>
      <form
        action={formAction}
        className="mt-6 flex w-full max-w-md flex-col gap-4"
      >
        <label className="text-lg font-medium">Select Files to Send:</label>
        <input
          type="file"
          name="files"
          multiple
          className="w-full rounded border p-2"
        />

        <label className="text-lg font-medium">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Send Files
        </button>
      </form>

      <p className="mt-4 text-red-500">
        IMPORTANT: Save the information below to access your files later. It
        will not be shown again and cannot be recovered.
      </p>

      {filesSended.groupId && (
        <>
          <p className="mt-4 text-green-600">Files sent successfully!</p>

          <p className="mt-2 text-gray-200">Group ID: {filesSended.groupId}</p>
          <p className="mt-2 text-gray-200">Message: {filesSended.message}</p>
          <ul className="mt-4 space-y-2">
            {filesSended.files?.map((file) => (
              <li key={file.fileId} className="text-gray-400">
                {file.filename} ({file.fileId})
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
