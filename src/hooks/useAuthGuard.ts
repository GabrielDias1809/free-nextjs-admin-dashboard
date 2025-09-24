"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  email: string;
  role: string;
  exp: number;
  sub: string;
}

export function useAuthGuard({ allowedRoles = [] }: { allowedRoles?: string[] } = {}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signin");
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(decoded.role)
      ) {
        router.replace("/error-404");
      }
    } catch (err) {
      console.error("Token inválido:", err);
      localStorage.removeItem("token");
      router.replace("/signin");
    }

    // ⛔️ Remover router das dependências aqui evita o loop infinito
  }, [allowedRoles]);
}
