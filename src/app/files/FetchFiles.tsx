"use client";

import { downloadFile } from "@/actions/client";
import { fetchFilesAction } from "@/actions/server";
import { useActionState, useState } from "react";
import { BsEye, BsEyeSlash, BsTrashFill } from "react-icons/bs";

export default function FetchFiles() {
  const [files, formAction, isFetching] = useActionState(
    fetchFilesAction,
    null,
  );

  const [groupId, setGroupId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  // Stub — você implementa depois
  const deleteFile = (fileId: string) => {
    console.log("DELETE FILE:", fileId);
  };

  const deleteGroup = () => {
    console.log("DELETE GROUP");
  };

  return (
    <>
      <form
        action={formAction}
        className="mt-6 flex w-full max-w-md flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/30"
      >
        <label className="text-lg font-medium text-gray-200">
          Enter File Group ID:
        </label>
        <input
          type="text"
          name="groupId"
          placeholder="Group ID"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-gray-200"
          required
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
        />

        <div className="relative">
          <label className="text-lg font-medium text-gray-200">Password:</label>
          <input
            type={passwordIsVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-gray-200"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute top-[52px] right-4 text-gray-400 transition hover:text-gray-200"
            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            {passwordIsVisible ? <BsEye size={22} /> : <BsEyeSlash size={22} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isFetching}
          className={`relative rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-gray-200 shadow-[0_0_15px_rgba(0,150,255,0.3)] transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(0,150,255,0.6)] disabled:cursor-not-allowed disabled:opacity-50 ${isFetching && "animate-pulse"} `}
        >
          {isFetching ? "Fetching..." : "Fetch Files"}
        </button>
      </form>

      {files && files.length > 0 && (
        <div className="mt-8 w-full max-w-md">
          <button
            onClick={deleteGroup}
            className="relative w-full rounded-xl border border-red-700 bg-red-900 px-6 py-3 font-semibold text-red-200 shadow-[0_0_15px_rgba(255,0,0,0.3)] transition-all duration-300 hover:border-red-500 hover:text-white hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]"
          >
            Delete Group
          </button>

          <p className="mt-4 text-yellow-400">
            ⚠ Deleting the group is permanent and cannot be undone.
          </p>
        </div>
      )}

      <ul className="mt-10 w-full max-w-md space-y-4">
        {files ? (
          files.map((file) => (
            <li
              key={file.fileId}
              className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg shadow-black/20 transition hover:bg-zinc-800"
            >
              <button
                onClick={() => downloadFile(file.fileId, groupId, password)}
                className="flex-1 text-left"
              >
                <h2 className="text-xl font-semibold text-gray-200">
                  {file.filename}
                </h2>
                <p className="text-sm text-gray-500">{file.fileId}</p>
              </button>

              <button
                onClick={() => deleteFile(file.fileId)}
                className="ml-4 rounded-lg border border-red-700 bg-red-800/40 p-2 transition-all hover:border-red-500 hover:bg-red-700 hover:text-white"
              >
                <BsTrashFill size={20} className="text-red-400" />
              </button>
            </li>
          ))
        ) : (
          <li className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-center">
            <p className="text-lg text-gray-400">No files found.</p>
          </li>
        )}
      </ul>
    </>
  );
}
