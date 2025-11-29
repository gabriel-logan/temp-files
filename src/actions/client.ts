export async function downloadFile(
  fileId: string,
  groupId: string,
  password: string,
) {
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
