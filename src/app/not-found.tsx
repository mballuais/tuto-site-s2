'use client';

import Link from 'next/link';
import { Container, Title, Text, Button, Stack } from '@mantine/core';

export default function NotFound() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="md">
        <Title order={1} c="red">404</Title> {/* ✅ ici c au lieu de color */}
        <Text size="lg">Oups, cette page n’existe pas !</Text>
        <Button component={Link} href="/" color="blue">
          Retour à l’accueil
        </Button>
      </Stack>
    </Container>
  );
}
