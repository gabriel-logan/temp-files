import { NextRequest, NextResponse } from "next/server";

// Cache
const fileCache = new Map<
  string,
  { buffer: Buffer; filename: string; type: string }
>();

// Função auxiliar para ler body multipart (upload)
async function parseMultipart(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    throw new Error("Nenhum arquivo enviado ou tipo inválido");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return { buffer, filename: file.name, type: file.type };
}

// ----------------- UPLOAD -----------------
export async function POST(req: NextRequest) {
  try {
    const { buffer, filename, type } = await parseMultipart(req);

    // Armazena no Map
    fileCache.set("file", { buffer, filename, type });

    return NextResponse.json({
      message: "Arquivo enviado com sucesso!",
      filename,
      type,
      size: buffer.length,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Erro inesperado" }, { status: 500 });
  }
}

// ----------------- LIMPAR CACHE -----------------
export async function PUT() {
  fileCache.delete("file");

  return NextResponse.json({ message: "Cache limpo com sucesso!" });
}

// ----------------- DOWNLOAD -----------------
export async function GET() {
  const cached = fileCache.get("file");

  if (!cached) {
    return NextResponse.json(
      { error: "Nenhum arquivo em cache" },
      { status: 404 },
    );
  }

  return new NextResponse(new Uint8Array(cached.buffer), {
    headers: {
      "Content-Type": cached.type,
      "Content-Disposition": `attachment; filename="${cached.filename}"`,
    },
  });
}

export { fileCache };
