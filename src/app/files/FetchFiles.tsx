"use client";

import { downloadFile } from "@/actions/client";
import { fetchFilesAction } from "@/actions/server";
import { useActionState, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function FetchFiles() {
  const [files, formAction, isFetching] = useActionState(
    fetchFilesAction,
    null,
  );

  const [groupId, setGroupId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

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

        <div className="relative">
          <label className="text-lg font-medium">Password:</label>
          <input
            type={passwordIsVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full rounded border p-2"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-9 right-3 cursor-pointer text-gray-500"
            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            {passwordIsVisible ? <BsEye size={24} /> : <BsEyeSlash size={24} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isFetching}
          className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 ${isFetching && "animate-pulse"}`}
        >
          {isFetching ? "Fetching..." : "Fetch Files"}
        </button>
      </form>

      {files && files.length > 0 && (
        <>
          <button
            className="mt-6 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => {}}
          >
            Delete Group
          </button>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            IMPORTANT: Deleting the group is irreversible and will remove all
            associated files permanently.
          </p>
        </>
      )}

      <ul className="mt-6 w-full max-w-md space-y-4 p-4">
        {files ? (
          files.map((file) => (
            <button
              key={file.fileId}
              className="w-full cursor-pointer"
              onClick={() => downloadFile(file.fileId, groupId, password)}
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
