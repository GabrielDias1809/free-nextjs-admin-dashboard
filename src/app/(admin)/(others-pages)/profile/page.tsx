"use client";

import React, { useEffect, useState } from "react";
import UserTable from "@/components/tables/UserTable"; // certifique-se que esteja neste caminho
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  role: string;
}

export default function UserTablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/signin");
      return;
    }

    fetch("http://localhost:3001/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar usuários.");
        }
        const data = await res.json();
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao buscar usuários.");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white/90">
        Lista de Usuários
      </h2>
      <UserTable
  data={users}
  onEdit={(user) => router.push(`${user.id}/update`)}
  onDelete={async (id) => {
    const confirmDelete = confirm("Tem certeza que deseja excluir?");
    if (!confirmDelete) return;
  
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Erro ao excluir usuário.");
      }
  
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir usuário.");
    }
  }}
/>
    </div>
  );
}
