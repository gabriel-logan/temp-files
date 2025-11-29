import { StoredFile } from "../cache/file-cache";

export interface DefaultErrorResponse {
  error: string | null;
}

export interface UploadFilesResponse {
  message: string;
  groupId: string;
  files: Omit<StoredFile, "buffer" | "password">[];
}

export interface DownloadFilesResponse {
  message: string;
  files: Omit<StoredFile, "buffer" | "password">[];
  groupId: string;
}

export interface DeleteFilesResponse {
  message: string;
}

export interface DownloadFilesRequest {
  groupId?: unknown;
  password?: unknown;
}

export interface DeleteFilesRequest {
  groupId?: unknown;
  password?: unknown;
}

export interface DownloadFileRequest {
  groupId?: unknown;
  fileId?: unknown;
  password?: unknown;
}

export interface DownloadFileResponse {
  fileId: string;
  filename: string;
}

export interface DeleteFileRequest {
  groupId?: unknown;
  fileId?: unknown;
}

export interface DeleteFileResponse {
  message: string;
}
