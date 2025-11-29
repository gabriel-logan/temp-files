# Documentação de Uso da API via CURL

## Locales
-- [English](README.md)
-- [Português (Brasil)](README_PT.md)

Base URL da API:

```
https://temp-files-lake.vercel.app
```

Esta documentação descreve como utilizar todas as rotas da aplicação **via cURL**, com exemplos separados para **Linux/MacOS** e **Windows (PowerShell)**.

---

# 📁 Upload de Arquivos

**Endpoint:** `POST /api/files`

Envia arquivos multipart/form-data.

### Campos obrigatórios

- `password` — senha necessária para qualquer operação posterior
- `files` — um ou mais arquivos

---

## Linux / MacOS

```
curl -X POST \
  -F "password=minhasenha" \
  -F "files=@/caminho/arquivo1.png" \
  -F "files=@/caminho/arquivo2.pdf" \
  https://temp-files-lake.vercel.app/api/files
```

---

## Windows (PowerShell)

```
curl -X POST `
  -F "password=minhasenha" `
  -F "files=@C:/caminho/arquivo1.png" `
  -F "files=@C:/caminho/arquivo2.pdf" `
  https://temp-files-lake.vercel.app/api/files
```

---

# 📄 Listar Arquivos de um Grupo

**Endpoint:** `POST /api/files/get-files`

Retorna metadados dos arquivos do grupo (mas não baixa o arquivo).

### Corpo JSON necessário

```json
{
  "groupId": "<id retornado no upload>",
  "password": "<senha usada no upload>"
}
```

---

## Linux / MacOS

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"groupId":"SEU_GROUP_ID","password":"minhasenha"}' \
  https://temp-files-lake.vercel.app/api/files/get-files
```

---

## Windows (PowerShell)

```
curl -X POST `
  -H "Content-Type: application/json" `
  -d '{"groupId":"SEU_GROUP_ID","password":"minhasenha"}' `
  https://temp-files-lake.vercel.app/api/files/get-files
```

---

# 📥 Download de Arquivo Específico

**Endpoint:** `POST /api/file`

Retorna o arquivo binário.

### Corpo JSON

```json
{
  "groupId": "<id>",
  "fileId": "<id do arquivo>",
  "password": "<senha>"
}
```

---

## Linux / MacOS

```
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"groupId":"SEU_GROUP_ID","fileId":"SEU_FILE_ID","password":"minhasenha"}' \
  https://temp-files-lake.vercel.app/api/file \
  --output arquivo_baixado.ext
```

---

## Windows (PowerShell)

```
curl -X POST `
  -H "Content-Type: application/json" `
  -d '{"groupId":"SEU_GROUP_ID","fileId":"SEU_FILE_ID","password":"minhasenha"}' `
  https://temp-files-lake.vercel.app/api/file `
  --output arquivo_baixado.ext
```

---

# 🗑️ Deletar Arquivo Específico

**Endpoint:** `DELETE /api/file`

### Corpo JSON

```json
{
  "groupId": "<id>",
  "fileId": "<id do arquivo>",
  "password": "<senha>"
}
```

---

## Linux / MacOS

```
curl -X DELETE \
  -H "Content-Type: application/json" \
  -d '{"groupId":"SEU_GROUP_ID","fileId":"SEU_FILE_ID","password":"minhasenha"}' \
  https://temp-files-lake.vercel.app/api/file
```

---

## Windows (PowerShell)

```
curl -X DELETE `
  -H "Content-Type: application/json" `
  -d '{"groupId":"SEU_GROUP_ID","fileId":"SEU_FILE_ID","password":"minhasenha"}' `
  https://temp-files-lake.vercel.app/api/file
```

---

# 🗃️ Deletar Grupo Inteiro de Arquivos

**Endpoint:** `DELETE /api/files`

### Corpo JSON

```json
{
  "groupId": "<id>",
  "password": "<senha>"
}
```

---

## Linux / MacOS

```
curl -X DELETE \
  -H "Content-Type: application/json" \
  -d '{"groupId":"SEU_GROUP_ID","password":"minhasenha"}' \
  https://temp-files-lake.vercel.app/api/files
```

---

## Windows (PowerShell)

```
curl -X DELETE `
  -H "Content-Type: application/json" `
  -d '{"groupId":"SEU_GROUP_ID","password":"minhasenha"}' `
  https://temp-files-lake.vercel.app/api/files
```

---

# ✅ Resumo das Rotas

| Ação               | Método | Rota                   |
| ------------------ | ------ | ---------------------- |
| Upload de arquivos | POST   | `/api/files`           |
| Listar arquivos    | POST   | `/api/files/get-files` |
| Baixar arquivo     | POST   | `/api/file`            |
| Deletar arquivo    | DELETE | `/api/file`            |
| Deletar grupo      | DELETE | `/api/files`           |
