"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Paper,
  Stack,
} from "@mantine/core";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    setLoading(false);
    if (res.ok) {
      router.push("/auth/login");
    } else {
      const { error } = await res.json();
      alert(error);
    }
  };

  return (
    <Paper shadow="xs" radius="md" p="xl" maw={400} mx="auto" mt="xl">
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Title order={2}>Inscription</Title>

          <TextInput
            label="Nom"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />

          <TextInput
            label="Email"
            placeholder="you@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />

          <PasswordInput
            label="Mot de passe"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />

          <Button type="submit" loading={loading} color="green">
            S’inscrire
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
