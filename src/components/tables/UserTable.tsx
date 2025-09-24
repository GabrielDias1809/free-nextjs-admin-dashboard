"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import  Button  from "../ui/button/Button";
import { Pencil, Trash2 } from "lucide-react"; // TailAdmin usa Lucide

interface User {
  id: number;
  email: string;
  role: string;
}

interface UserTableProps {
  data: User[];
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
}

export default function UserTable({ data, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[500px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Função
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 text-start font-medium text-gray-500 text-theme-xs dark:text-gray-400"
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length > 0 ? (
                data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-600 text-theme-sm dark:text-gray-300">
                      {user.role}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-600 text-theme-sm dark:text-gray-300 space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit?.(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          confirm("Tem certeza que deseja excluir?")
                            ? onDelete?.(user.id)
                            : null
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-5 py-4 text-center text-gray-500"
                  >
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
