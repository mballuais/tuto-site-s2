// src/app/api/upload/route.ts
export const runtime = "nodejs";
export const config = { api: { bodyParser: false } };

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();
  const fileField = formData.get("file");
  if (!fileField || !(fileField instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier envoyé" }, { status: 400 });
  }

  const buffer = Buffer.from(await fileField.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public/uploads");
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const ext = path.extname(fileField.name);
  const filename = `${Date.now()}${ext}`;
  await fs.promises.writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ filePath: `/uploads/${filename}` });
}
