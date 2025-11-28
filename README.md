## Getting Started

First, run the development server:

```bash
npm run dev
```

---

## 🐧 **Versão Linux / macOS**

### 📤 Upload (POST)

```bash
curl -X POST -F "file=@tsconfig.json" https://temp-ebon-sigma.vercel.app/api
```

### 📥 Download (GET)

```bash
curl -O https://temp-ebon-sigma.vercel.app/api
```

### 🧹 Limpar cache (PUT)

```bash
curl -X PUT https://temp-ebon-sigma.vercel.app/api
```

---

## 🪟 **Versão Windows (PowerShell)**

> ⚠️ Use `curl.exe`, não `curl`, porque no PowerShell o alias “curl” chama o `Invoke-WebRequest` e quebra os parâmetros `-F` e `-X`.

### 📤 Upload (POST)

```powershell
curl.exe -X POST -F "file=@tsconfig.json" https://temp-ebon-sigma.vercel.app/api
```

### 📥 Download (GET)

```powershell
curl.exe -O https://temp-ebon-sigma.vercel.app/api
```

### 🧹 Limpar cache (PUT)

```powershell
curl.exe -X PUT https://temp-ebon-sigma.vercel.app/api
```

---

### ✅ Explicação rápida

| Ação         | Método HTTP | Descrição                           |
| ------------ | ----------- | ----------------------------------- |
| Upload       | `POST`      | Envia arquivo `file=@<nome>`        |
| Download     | `GET`       | Faz download do arquivo em cache    |
| Limpar cache | `PUT`       | Apaga o arquivo do cache em memória |
