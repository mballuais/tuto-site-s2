import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
  }
  const hashed = await hash(password, 10);
  await prisma.user.create({
    data: { email, password: hashed, name, role: "USER" },
  });
  return NextResponse.json({ ok: true });
}
