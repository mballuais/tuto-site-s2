import Link from "next/link";
import {
  Container,
  Title,
  Stack,
  Button,
  Paper,
} from "@mantine/core";

export default function AdminDashboard() {
  return (
    <Container size="sm" py="xl">
      <Paper shadow="xs" radius="md" p="xl">
        <Stack gap="lg">
          <Title order={2}>Dashboard Admin</Title>

          <Button
            component={Link}
            href="/admin/tutoriel/new"
            color="green"
            fullWidth
            size="md"
          >
            ➕ Créer un nouveau tutoriel
          </Button>

          <Button
            component={Link}
            href="/admin/tutoriel/list"
            color="blue"
            fullWidth
            size="md"
          >
            📝 Gérer les tutoriels existants
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
