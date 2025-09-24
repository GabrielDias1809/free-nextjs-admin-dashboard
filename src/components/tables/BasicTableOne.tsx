"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button/Button";
import { Pencil } from "lucide-react"; // só usamos o ícone de editar

interface OrdemDeServico {
  id: number;
  ordemServico: string;
  om: string;
  situacao: string;
  servicoSolicitado: string;
  servicoRealizado: string;
  inicioServico: string;
  fimServico: string;
}

interface OrdemServicoTableProps {
  data: OrdemDeServico[];
  onEdit?: (ordem: OrdemDeServico) => void;
}

export default function OrdemServicoTable({
  data,
  onEdit,
}: OrdemServicoTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            {/* Cabeçalho */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
  <TableRow>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      Nº Ordem
    </TableCell>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      OM
    </TableCell>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      Situação
    </TableCell>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      Serviço Solicitado
    </TableCell>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      Serviço Realizado
    </TableCell>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      Início
    </TableCell>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      Fim
    </TableCell>
    <TableCell className="px-5 py-3 font-medium text-gray-500 text-theme-xs">
      Ações
    </TableCell>
  </TableRow>
</TableHeader>


            {/* Corpo */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length > 0 ? (
                data.map((ordem) => (
                  <TableRow key={ordem.id}>
                    <TableCell className="px-5 py-4 text-start text-gray-800 text-theme-sm dark:text-white/90">
                      {ordem.ordemServico}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-gray-600 text-theme-sm dark:text-gray-300">
                      {ordem.om}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300">
                      {ordem.situacao}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300">
                      {ordem.servicoSolicitado}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300">
                      {ordem.servicoRealizado}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300">
                      {ordem.inicioServico}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300">
                      {ordem.fimServico}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-600 dark:text-gray-300">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit?.(ordem)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="px-5 py-4 text-center text-gray-500"
                  >
                    Nenhuma Ordem de Serviço encontrada.
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
