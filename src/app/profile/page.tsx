import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { Container, Title, Text, Button, Stack, Paper } from "@mantine/core";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Container size="sm" py="xl">
        <Text>Vous devez être connecté pour voir cette page.</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Paper shadow="xs" radius="md" p="xl">
        <Stack gap="sm">
          <Title order={2}>Mon compte</Title>

          <Text>
            <strong>Nom :</strong> {session.user?.name || "—"}
          </Text>
          <Text>
            <strong>Email :</strong> {session.user?.email}
          </Text>

          <Button component={Link} href="/" color="red" mt="md">
            Revenir à l’accueil
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
