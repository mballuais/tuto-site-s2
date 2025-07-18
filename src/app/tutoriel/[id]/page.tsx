import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import React from "react";
import { CompleteButton } from "../../../components/CompleteButton";
import {
  Container,
  Title,
  Text,
  Paper,
  Divider,
  Box,
} from "@mantine/core";

const prisma = new PrismaClient();

export default async function TutorialPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const tut = await prisma.tutorial.findUnique({ where: { id } });
  if (!tut) notFound();

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="sm">
        {tut.title}
      </Title>
      <Text size="sm" c="dimmed" mb="lg">
        Publié le {new Date(tut.createdAt).toLocaleDateString("fr-FR")}
      </Text>

      <Paper shadow="xs" radius="md" p="lg" withBorder>
        {tut.type === "TEXT" ? (
          <Box
            style={{
              lineHeight: 1.6,
              fontSize: 16,
              maxWidth: "100%",
            }}
            dangerouslySetInnerHTML={{ __html: tut.content! }}
          />
        ) : (
          <video controls style={{ width: "100%", maxWidth: 800, margin: "0 auto", display: "block" }}>
            <source src={tut.videoUrl!} />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        )}
      </Paper>

      <Divider my="xl" />

      <CompleteButton tutorialId={tut.id} />
    </Container>
  );
}
