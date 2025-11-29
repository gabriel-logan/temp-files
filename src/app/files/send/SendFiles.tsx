"use client";

import { sendFilesAction } from "@/actions/server";
import { useActionState, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export default function SendFiles() {
  const [filesSended, formAction, isSending] = useActionState(
    sendFilesAction,
    null,
  );

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <>
      <form
        action={formAction}
        className="mt-6 flex w-full max-w-md flex-col gap-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/30"
      >
        <label className="text-lg font-medium text-gray-200">
          Select Files to Send:
        </label>

        <input
          type="file"
          name="files"
          multiple
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-gray-200 file:rounded-md file:border-none file:bg-zinc-700 file:text-gray-300"
          required
        />

        <div className="relative">
          <label className="text-lg font-medium text-gray-200">Password</label>
          <input
            type={passwordIsVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-gray-200"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
            className="absolute top-12 right-4 text-gray-400 transition hover:text-gray-200"
          >
            {passwordIsVisible ? <BsEye size={22} /> : <BsEyeSlash size={22} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSending}
          className={`relative rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 font-semibold text-gray-200 shadow-[0_0_15px_rgba(0,150,255,0.3)] transition-all duration-300 hover:border-blue-500 hover:text-white hover:shadow-[0_0_25px_rgba(0,150,255,0.6)] disabled:cursor-not-allowed disabled:opacity-50 ${isSending && "animate-pulse"} `}
        >
          {isSending ? "Sending..." : "Send Files"}
        </button>
      </form>

      <p className="mt-6 max-w-md font-medium text-yellow-400">
        ⚠ IMPORTANT: Save the information below to access your files later. It
        will not be shown again and cannot be recovered.
      </p>

      {filesSended && filesSended.groupId && (
        <div className="mt-6 w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl shadow-black/20">
          <p className="text-lg font-semibold text-green-400">
            Files sent successfully!
          </p>

          <p className="mt-2 text-gray-300">Group ID: {filesSended.groupId}</p>
          <p className="mt-2 text-gray-300">Message: {filesSended.message}</p>

          <ul className="mt-4 space-y-2">
            {filesSended.files?.map((file) => (
              <li key={file.fileId} className="text-gray-400">
                {file.filename}: ({file.fileId})
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
