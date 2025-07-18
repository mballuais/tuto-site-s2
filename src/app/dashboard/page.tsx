// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import DeleteAccountButton from "@/components/DeleteAccountButton";

import {
  Container,
  Title,
  Text,
  List,
  Anchor,
  Stack,
  Paper,
} from "@mantine/core";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/auth/login");

  const userTutorials = await prisma.userTutorial.findMany({
    where: { user: { email: session.user.email } },
    include: { tutorial: true },
    orderBy: { completedAt: "desc" },
  });

  const tutorials = userTutorials.map((ut) => ut.tutorial);

  return (
    <Container size="md" py="xl">
      <Paper p="xl" radius="md" shadow="xs">
        <Stack gap="lg">
          <div>
            <Title order={2}>Mon espace</Title>
            <Text>
              Bonjour, <strong>{session.user.name || session.user.email}</strong> !
            </Text>
          </div>

          <div>
            <Title order={3} size="h4" mb="xs">
              Historique des tutoriels
            </Title>

            {tutorials.length === 0 ? (
              <Text c="dimmed">Vous n’avez encore complété aucun tutoriel.</Text>
            ) : (
              <List type="unordered" spacing="xs" pl="md" listStyleType="disc">
                {tutorials.map((t) => (
                  <li key={t.id}>
                    <Anchor component={Link} href={`/tutoriel/${t.id}`} color="blue">
                      {t.title}
                    </Anchor>
                  </li>
                ))}
              </List>
            )}
          </div>

          <div>
            <DeleteAccountButton />
          </div>
        </Stack>
      </Paper>
    </Container>
  );
}
