export interface UploadResponse {
  message: string;
  groupId: string;
  files: number;
}

export interface DownloadFilesRequest {
  groupId?: string;
  password?: string;
}

export interface DownloadFileRequest {
  groupId: string;
  fileId: string;
  password: string;
}
