"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Group, Badge } from "@mantine/core";

export default function FilterBar({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = searchParams.get("cat") || "";

  const onSelect = (cat: string) => {
    const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
    if (cat) params.set("cat", cat);
    else params.delete("cat");
    router.push(`/?${params.toString()}`);
  };

  // 🧹 On nettoie les noms (trim et toLowerCase) puis on mappe vers l’original
  const cleanedCategoriesMap = new Map<string, string>();
  categories.forEach((cat) => {
    const clean = cat.trim().toLowerCase();
    if (!cleanedCategoriesMap.has(clean)) {
      cleanedCategoriesMap.set(clean, cat.trim()); // garde une version propre
    }
  });

  const uniqueCategories = Array.from(cleanedCategoriesMap.values()).sort();

  return (
    <Group gap="sm" wrap="wrap">
      <Badge
        variant={current === "" ? "filled" : "outline"}
        color="indigo"
        onClick={() => onSelect("")}
        style={{ cursor: "pointer" }}
      >
        Tous
      </Badge>

      {uniqueCategories.map((cat) => (
        <Badge
          key={cat}
          variant={current === cat ? "filled" : "outline"}
          color="indigo"
          onClick={() => onSelect(cat)}
          style={{ cursor: "pointer" }}
        >
          {cat}
        </Badge>
      ))}
    </Group>
  );
}
