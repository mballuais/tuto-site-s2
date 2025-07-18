"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function DeleteAccountButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("⚠️ Supprimer définitivement ton compte ?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await fetch("/api/user", { method: "DELETE" });
      await signOut({ redirect: false });
      router.push("/");
    } catch (err) {
      console.error("Erreur suppression compte :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      mt="md"
      color="red"
      variant="filled"
      onClick={handleDelete}
      loading={loading}
      leftSection={<IconTrash size={16} />}
    >
      Supprimer mon compte
    </Button>
  );
}
