"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Paper,
  Stack,
} from "@mantine/core";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Échec de la connexion");
    }
  };

  return (
    <Paper shadow="xs" radius="md" p="xl" maw={400} mx="auto" mt="xl">
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Title order={2}>Connexion</Title>

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

          <Button type="submit" loading={loading} color="blue">
            Se connecter
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
