// src/app/admin/tutoriel/[id]/page.tsx
import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import AdminEditForm from "@/components/AdminEditForm";

const prisma = new PrismaClient();

export default async function EditTutorialPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const tut = await prisma.tutorial.findUnique({ where: { id } });
  if (!tut) notFound();

  return (
    <AdminEditForm
      id={tut.id}
      title={tut.title}
      category={tut.category}
      type={tut.type}
      content={tut.content || ""}
      videoUrl={tut.videoUrl || ""}
    />
  );
}
