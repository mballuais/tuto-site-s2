"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  Textarea,
  Button,
  Select,
  Title,
  Stack,
  Paper,
} from "@mantine/core";

interface Props {
  id: number;
  title: string;
  category: string;
  type: "TEXT" | "VIDEO";
  content: string;
  videoUrl: string;
}

export default function AdminEditForm({
  id,
  title: t0,
  category: c0,
  type: type0,
  content: cont0,
  videoUrl: v0,
}: Props) {
  const [title, setTitle] = useState(t0);
  const [category, setCategory] = useState(c0);
  const [type, setType] = useState<"TEXT" | "VIDEO">(type0);
  const [content, setContent] = useState(cont0);
  const [videoUrl, setVideoUrl] = useState(v0);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/tutorials/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, type, content, videoUrl }),
    });
    router.push("/admin/tutoriel/list");
  };

  return (
    <Paper shadow="xs" radius="md" p="xl" maw={600} mx="auto">
      <form onSubmit={submit}>
        <Stack gap="md">
          <Title order={2}>Modifier ce tutoriel</Title>

          <TextInput
            label="Titre"
            placeholder="Titre"
            required
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />

          <TextInput
            label="Catégorie"
            placeholder="Catégorie"
            required
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
          />

          <Select
            label="Type"
            value={type}
            onChange={(value) => setType(value as "TEXT" | "VIDEO")}
            data={[
              { value: "TEXT", label: "Écrit" },
              { value: "VIDEO", label: "Vidéo" },
            ]}
          />

          {type === "TEXT" ? (
            <Textarea
              label="Contenu HTML"
              placeholder="Contenu HTML"
              required
              minRows={8}
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
            />
          ) : (
            <TextInput
              label="URL de la vidéo"
              placeholder="Chemin du fichier vidéo"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.currentTarget.value)}
            />
          )}

          <Button type="submit" color="green">
            Enregistrer
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
