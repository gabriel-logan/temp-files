export async function downloadFile(
  fileId: string,
  groupId: string,
  password: string,
) {
  try {
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
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("An error occurred while downloading the file.");
  }
}

export async function deleteGroupAction(groupId: string, password: string) {
  try {
    const confirmDelete = confirm(
      "Are you sure you want to delete this group and all its files? This action cannot be undone.",
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/files`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          password,
        }),
      },
    );

    if (!response.ok) {
      console.error("Failed to delete group");
      alert("Failed to delete group. Please check your credentials.");
      return;
    }

    alert("Group deleted successfully.");
  } catch (error) {
    console.error("Error deleting group:", error);
    alert("An error occurred while deleting the group.");
  }
}

export async function deleteFileAction(
  groupId: string,
  fileId: string,
  password: string,
) {
  try {
    const confirmDelete = confirm(
      "Are you sure you want to delete this file? This action cannot be undone.",
    );

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/file`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          groupId,
          fileId,
          password,
        }),
      },
    );

    if (!response.ok) {
      console.error("Failed to delete file");
      alert("Failed to delete file. Please check your credentials.");
      return;
    }

    alert("File deleted successfully.");
  } catch (error) {
    console.error("Error deleting file:", error);
    alert("An error occurred while deleting the file.");
  }
}
