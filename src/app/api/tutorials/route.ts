import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("cat");
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const tutorials = await prisma.tutorial.findMany({
    where: category ? { category } : {},
    orderBy: { createdAt: sort },
  });

  return NextResponse.json(tutorials);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, type, content, videoUrl } = body;

    if (!title || !category || !type) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const tutorial = await prisma.tutorial.create({
      data: {
        title,
        category,
        type,
        content,
        videoUrl,
      },
    });

    return NextResponse.json(tutorial, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/tutorials:", error);
    return NextResponse.json(
      { error: "Erreur interne serveur" },
      { status: 500 }
    );
  }
}
