export interface UploadResponse {
  message: string;
  groupId: string;
  files: number;
}

export interface DownloadRequest {
  groupId?: string;
  password?: string;
}
