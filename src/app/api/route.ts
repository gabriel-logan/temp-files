import { NextRequest, NextResponse } from "next/server";

// Cache temporário global
let cachedFile: { buffer: Buffer; filename: string; type: string } | null =
  null;

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

    // Armazena em cache
    cachedFile = { buffer, filename, type };

    return NextResponse.json({
      message: "Arquivo enviado com sucesso!",
      filename,
      type,
      size: buffer.length,
    });
  } catch (err: { message: string } | unknown) {
    return NextResponse.json(
      { error: (err as { message: string }).message },
      { status: 400 },
    );
  }
}

// ----------------- LIMPAR CACHE -----------------
export async function PUT() {
  cachedFile = null;
  return NextResponse.json({ message: "Cache limpo com sucesso!" });
}

// ----------------- DOWNLOAD -----------------
export async function GET() {
  if (!cachedFile) {
    return NextResponse.json(
      { error: "Nenhum arquivo em cache" },
      { status: 404 },
    );
  }

  return new NextResponse(new Uint8Array(cachedFile.buffer), {
    headers: {
      "Content-Type": cachedFile.type,
      "Content-Disposition": `attachment; filename="${cachedFile.filename}"`,
    },
  });
}

export { cachedFile };
