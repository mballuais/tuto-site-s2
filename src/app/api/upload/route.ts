// src/app/api/upload/route.ts
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";

// Désactive le body parser natif
export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "nodejs",
};

export async function POST(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), "public/uploads");
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 100 * 1024 * 1024, // 100 Mo
    filename: (name, ext, part) => {
      return `${Date.now()}-${part.originalFilename}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return resolve(
          NextResponse.json({ error: "Erreur d'upload" }, { status: 500 })
        );
      }

      const file = files.file?.[0];
      if (!file) {
        return resolve(
          NextResponse.json({ error: "Fichier manquant" }, { status: 400 })
        );
      }

      const filePath = "/uploads/" + path.basename(file.filepath);
      return resolve(NextResponse.json({ filePath }));
    });
  });
}
