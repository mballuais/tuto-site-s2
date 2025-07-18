// src/app/api/tutorials/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Optionnel : on peut lire ?cat=… et ?sort=asc|desc
  const category = searchParams.get("cat");
  const sort = searchParams.get("sort") === "asc" ? "asc" : "desc";

  const tutorials = await prisma.tutorial.findMany({
    where: category ? { category } : {},
    orderBy: { createdAt: sort },
  });

  return NextResponse.json(tutorials);
}
