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
}

export interface DeleteFilesResponse {
  message: string;
}

export interface DownloadFilesRequest {
  groupId?: string;
  password?: string;
}

export interface DeleteFilesRequest {
  groupId?: string;
  password?: string;
}

export interface DownloadFileRequest {
  groupId?: string;
  fileId?: string;
  password?: string;
}

export interface DownloadFileResponse {
  fileId: string;
  filename: string;
}

export interface DeleteFileRequest {
  groupId?: string;
  fileId?: string;
}

export interface DeleteFileResponse {
  message: string;
}
