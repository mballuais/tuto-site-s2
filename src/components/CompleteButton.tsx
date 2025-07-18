"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button, Text, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

export function CompleteButton({ tutorialId }: { tutorialId: number }) {
  const { data: session, status } = useSession();
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/user/tutorials", { cache: "no-store" })
      .then((res) => res.json())
      .then((list: any[]) => {
        if (list.find((t) => t.id === tutorialId)) setDone(true);
      });
  }, [status, tutorialId]);

  if (status !== "authenticated") return null;

  if (done) {
    return (
      <Group mt="md">
        <IconCheck size={18} color="green" />
        <Text c="green">✓ Tutoriel complété</Text>
      </Group>
    );
  }

  const markDone = async () => {
    setLoading(true);
    await fetch("/api/user/tutorials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tutorialId }),
    });
    setDone(true);
    setLoading(false);
  };

  return (
    <Button mt="md" loading={loading} onClick={markDone} color="blue">
      Marquer comme complété
    </Button>
  );
}
