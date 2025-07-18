import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import AdminDeleteButton from "@/components/AdminDeleteButton";
import {
  Container,
  Title,
  Button,
  Stack,
  Group,
  Paper,
  Text,
} from "@mantine/core";

const prisma = new PrismaClient();

export default async function TutorialListPage() {
  const tutorials = await prisma.tutorial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container size="md" pt="xl">
      <Stack gap="md">
        <Title order={2}>Gérer les tutoriels</Title>

        <Button
          component={Link}
          href="/admin/tutoriel/new"
          color="blue"
          radius="md"
        >
          + Nouveau tutoriel
        </Button>

        <Stack gap="sm">
          {tutorials.map((t) => (
            <Paper key={t.id} shadow="xs" p="md" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text fw={600} size="lg">
                    {t.title}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {t.category}
                  </Text>
                </div>

                <Group gap="xs">
                  <Button
                    component={Link}
                    href={`/admin/tutoriel/${t.id}`}
                    variant="filled"
                    color="yellow"
                    size="xs"
                  >
                    Modifier
                  </Button>
                  <AdminDeleteButton id={t.id} />
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
