# API Usage Documentation via CURL

## Locales

-- [English](README.md)
-- [Português (Brasil)](README_PT.md)

Base URL:

```
https://temp-files-lake.vercel.app
```

This documentation explains how to use the entire API **via cURL**, with examples for **Linux/MacOS** and **Windows (PowerShell)**.

---

# 📁 Upload Files

**Endpoint:** `POST /api/files`

Uploads files via multipart/form-data.

### Required fields

- `password` — password needed for all future operations
- `files` — one or more files

---

## Linux / MacOS

```
curl -X POST \
  -F "password=mypassword" \
  -F "files=@/path/file1.png" \
  -F "files=@/path/file2.pdf" \
  https://temp-files-lake.vercel.app/api/files
```

---

## Windows (PowerShell)

```
curl -X POST `
  -F "password=mypassword" `
  -F "files=@C:/path/file1.png" `
  -F "files=@C:/path/file2.pdf" `
  https://temp-files-lake.vercel.app/api/files
```

---

# 📄 List Files in a Group

**Endpoint:** `POST /api/files/get-files`

Returns metadata about files in the group (does not download files).

### JSON body

```json
{
  "groupId": "<id returned on upload>",
  "password": "<password used on upload>"
}
```

---

## Linux / MacOS

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"groupId":"YOUR_GROUP_ID","password":"mypassword"}' \
  https://temp-files-lake.vercel.app/api/files/get-files
```

---

## Windows (PowerShell)

```
curl -X POST `
  -H "Content-Type: application/json" `
  -d '{"groupId":"YOUR_GROUP_ID","password":"mypassword"}' `
  https://temp-files-lake.vercel.app/api/files/get-files
```

---

# 📥 Download a Specific File

**Endpoint:** `POST /api/file`

Returns the binary file.

### JSON body

```json
{
  "groupId": "<id>",
  "fileId": "<file id>",
  "password": "<password>"
}
```

---

## Linux / MacOS

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"groupId":"YOUR_GROUP_ID","fileId":"YOUR_FILE_ID","password":"mypassword"}' \
  https://temp-files-lake.vercel.app/api/file \
  --output downloaded_file.ext
```

---

## Windows (PowerShell)

```
curl -X POST `
  -H "Content-Type: application/json" `
  -d '{"groupId":"YOUR_GROUP_ID","fileId":"YOUR_FILE_ID","password":"mypassword"}' `
  https://temp-files-lake.vercel.app/api/file `
  --output downloaded_file.ext
```

---

# 🗑️ Delete a Specific File

**Endpoint:** `DELETE /api/file`

### JSON body

```json
{
  "groupId": "<id>",
  "fileId": "<file id>",
  "password": "<password>"
}
```

---

## Linux / MacOS

```
curl -X DELETE \
  -H "Content-Type: application/json" \
  -d '{"groupId":"YOUR_GROUP_ID","fileId":"YOUR_FILE_ID","password":"mypassword"}' \
  https://temp-files-lake.vercel.app/api/file
```

---

## Windows (PowerShell)

```
curl -X DELETE `
  -H "Content-Type: application/json" `
  -d '{"groupId":"YOUR_GROUP_ID","fileId":"YOUR_FILE_ID","password":"mypassword"}' `
  https://temp-files-lake.vercel.app/api/file
```

---

# 🗃️ Delete Entire File Group

**Endpoint:** `DELETE /api/files`

### JSON body

```json
{
  "groupId": "<id>",
  "password": "<password>"
}
```

---

## Linux / MacOS

```
curl -X DELETE \
  -H "Content-Type: application/json" \
  -d '{"groupId":"YOUR_GROUP_ID","password":"mypassword"}' \
  https://temp-files-lake.vercel.app/api/files
```

---

## Windows (PowerShell)

```
curl -X DELETE `
  -H "Content-Type: application/json" `
  -d '{"groupId":"YOUR_GROUP_ID","password":"mypassword"}' `
  https://temp-files-lake.vercel.app/api/files
```

---

# ✅ Route Summary

| Action        | Method | Route                  |
| ------------- | ------ | ---------------------- |
| Upload files  | POST   | `/api/files`           |
| List files    | POST   | `/api/files/get-files` |
| Download file | POST   | `/api/file`            |
| Delete file   | DELETE | `/api/file`            |
| Delete group  | DELETE | `/api/files`           |
