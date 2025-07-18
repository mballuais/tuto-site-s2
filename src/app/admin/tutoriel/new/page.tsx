"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  Select,
  Textarea,
  Button,
  Title,
  Stack,
  Paper,
  FileInput,
} from "@mantine/core";

export default function NewTutorialPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"VIDEO" | "TEXT">("TEXT");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let videoUrl = "";
    if (type === "VIDEO" && file) {
      const data = new FormData();
      data.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const { filePath } = await uploadRes.json();
      videoUrl = filePath;
    }

    await fetch("/api/tutorials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, type, content, videoUrl }),
    });

    setLoading(false);
    router.push("/admin");
  };

  return (
    <Paper shadow="xs" radius="md" p="xl" maw={600} mx="auto" mt="xl">
      <form onSubmit={submit}>
        <Stack gap="md">
          <Title order={2}>Créer un nouveau tutoriel</Title>

          <TextInput
            label="Titre"
            placeholder="Titre du tutoriel"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Catégorie"
            placeholder="Nom de la catégorie"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            required
          />

          <Select
            label="Type"
            data={[
              { value: "TEXT", label: "Écrit" },
              { value: "VIDEO", label: "Vidéo" },
            ]}
            value={type}
            onChange={(value) => setType(value as "TEXT" | "VIDEO")}
            required
          />

          {type === "TEXT" ? (
            <Textarea
              label="Contenu HTML"
              placeholder="<h1>Bienvenue !</h1>"
              value={content}
              onChange={(e) => setContent(e.currentTarget.value)}
              minRows={8}
              required
            />
          ) : (
            <FileInput
              label="Vidéo"
              placeholder="Sélectionnez un fichier .mp4"
              accept="video/mp4"
              value={file}
              onChange={setFile}
              required
            />
          )}

          <Button type="submit" loading={loading} color="blue">
            Créer
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
