import { Container, Title, Text, Stack } from '@mantine/core';

export default function CGUPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="md">
        <Title order={2}>Conditions Générales d’Utilisation</Title>

        <Text>
          Ce site est un travail pédagogique réalisé dans le cadre d’un projet étudiant. Il n’a aucun but commercial.
        </Text>

        <Title order={3} size="h4">Mentions légales</Title>
        <Text>
          Aucune donnée personnelle n’est collectée en dehors de celles nécessaires à la connexion.
          Aucune publicité, ni aucun tracking tiers n’est utilisé.
        </Text>

        <Title order={3} size="h4">Protection des données (RGPD)</Title>
        <Text>
          Conformément au RGPD, les utilisateurs peuvent à tout moment supprimer leur compte et les données associées depuis leur espace personnel.
        </Text>

        <Text size="sm" c="dimmed">
          Pour toute question, veuillez contacter le responsable pédagogique du projet.
        </Text>
      </Stack>
    </Container>
  );
}
