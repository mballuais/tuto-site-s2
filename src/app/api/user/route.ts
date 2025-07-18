// src/app/api/user/route.ts
import { NextResponse }    from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions }     from "../auth/[...nextauth]/route";
import { PrismaClient }    from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // Supprime d’abord les liaisons
  await prisma.userTutorial.deleteMany({
    where: { user: { email: session.user.email } },
  });

  // Puis l’utilisateur
  await prisma.user.delete({
    where: { email: session.user.email },
  });

  return NextResponse.json({ ok: true });
}
