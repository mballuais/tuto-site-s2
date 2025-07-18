"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";

export default function AdminDeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = confirm("Supprimer ce tutoriel ?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await fetch(`/api/tutorials/${id}`, { method: "DELETE" });
      router.refresh();
    } catch (err) {
      console.error("Erreur suppression :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      color="red"
      leftSection={<IconTrash size={16} />}
      loading={loading}
      onClick={handleDelete}
      variant="filled"
    >
      Supprimer
    </Button>
  );
}
