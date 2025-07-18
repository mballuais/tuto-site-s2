import Link from "next/link";
import { Card, Title, Text, SimpleGrid, Container, Group, Badge, Paper } from "@mantine/core";
import FilterBar from "@/components/FilterBar";

interface Tutorial {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  type: "TEXT" | "VIDEO";
}

async function getTutorials(cat?: string, sort?: string): Promise<Tutorial[]> {
  const params = new URLSearchParams();
  if (cat) params.set("cat", cat);
  if (sort) params.set("sort", sort);
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${base}/api/tutorials?${params}`, { cache: "no-store" });
  return res.json();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; sort?: string }>;
}) {
  const { cat: catParam = "", sort: sortParam = "desc" } = await searchParams;
  const cat = catParam;
  const sort = sortParam === "asc" ? "asc" : "desc";
  const tutorials = await getTutorials(cat, sort);
  const categories = Array.from(new Set(tutorials.map((t) => t.category)));

  return (
    <Container size="lg" py="xl">
      {/* Header + Filtres */}
      <Title order={1} mb="md">
        Nos tutoriels
      </Title>

      <Paper withBorder shadow="xs" radius="md" p="md" mb="xl">
        <FilterBar categories={categories} />
      </Paper>

      {/* Grille des tutoriels */}
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {tutorials.map((tut) => (
          <Card
            key={tut.id}
            component={Link}
            href={`/tutoriel/${tut.id}`}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Group justify="space-between" mb="xs">
              <Title order={3}>{tut.title}</Title>
              <Badge color="indigo" variant="light">
                {tut.type}
              </Badge>
            </Group>

            <Text c="dimmed" size="sm" mb="xs">
              Catégorie : {tut.category}
            </Text>
            <Text c="dimmed" size="xs">
              Publié le {new Date(tut.createdAt).toLocaleDateString("fr-FR")}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
