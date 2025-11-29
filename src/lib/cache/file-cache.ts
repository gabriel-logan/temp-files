import "server-only";

export type StoredFile = {
  fileId: string; // unique ID
  buffer: Buffer;
  filename: string;
  type: string;
  password: string;
};

// Cache -> groups -> files
// Map<groupId, Array<{ buffer, filename, type, password }>>
export const filesCache = new Map<string, StoredFile[]>();
