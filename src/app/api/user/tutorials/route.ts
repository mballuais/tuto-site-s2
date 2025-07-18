// src/app/api/user/tutorials/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { tutorialId } = await request.json();
  // Crée la liaison user–tutorial
  await prisma.userTutorial.create({
    data: {
      user:      { connect: { email: session.user.email } },
      tutorial:  { connect: { id: tutorialId } },
    },
  });

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const list = await prisma.userTutorial.findMany({
    where: { user: { email: session.user.email } },
    include: { tutorial: true },
    orderBy: { completedAt: "desc" },
  });

  return NextResponse.json(list.map((ut) => ut.tutorial));
}
