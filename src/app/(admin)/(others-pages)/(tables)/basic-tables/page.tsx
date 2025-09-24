"use client";

import React, { useEffect, useState } from "react";
import PieChartStatus from "@/components/charts/pizza/PieChartCard";
import PieChartMarcaErros from "@/components/charts/pizza/PieChartMarcaErros";
import PieChartMEM from "@/components/charts/pizza/PieChartMEM";
import PieChartOM from "@/components/charts/pizza/PieChartOM";
import OrdemServicoTable from "@/components/tables/BasicTableOne";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function DashboardPage() {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [editingOrdem, setEditingOrdem] = useState<any | null>(null);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/ordens-servico", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
  
      console.log("📦 Dados brutos da API:", data);
  
      const mapped = data.map((o: any) => ({
        id: o.id,
        ordemServico: o.ordemServico,
        om: o.om,
        situacao: o.situacao,
        servicoSolicitado: o.servicoSolicitado,
        servicoRealizado: o.servicoRealizado,
        inicioServico: o.inicioServico,
        fimServico: o.fimServico,
      }));
  
      console.log("📊 Dados mapeados:", mapped);
  
      setOrdens(mapped);
    }
  
    fetchData();
  }, []);

  const handleEdit = (ordem: any) => {
    setEditingOrdem(ordem);
  };

  return (
    <div className="space-y-8">

      {/* Tabela de Ordens */}
      <div>
        <PageBreadcrumb pageTitle="Ordens de Serviço"/>
        <OrdemServicoTable data={ordens} onEdit={handleEdit} />
      </div>

      {/* Modal de Edição */}
      {editingOrdem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-lg w-[500px]">
            <h2 className="text-lg font-bold mb-4">Editar Ordem</h2>

            <div className="space-y-3">
  <input
    type="text"
    value={editingOrdem.ordemServico}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, ordemServico: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="Nº Ordem"
  />

  <input
    type="text"
    value={editingOrdem.om}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, om: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="OM"
  />

  <select
    value={editingOrdem.situacao}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, situacao: e.target.value })}
    className="w-full rounded border px-3 py-2"
  >
    <option value="aberta">Aberta</option>
    <option value="fechada">Fechada</option>
  </select>

  <input
    type="text"
    value={editingOrdem.marca}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, marcaMaterial: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="Marca do Material"
  />

  <input
    type="text"
    value={editingOrdem.mem}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, mem: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="Tipo de MEM"
  />

  <input
    type="text"
    value={editingOrdem.sistema}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, sistema: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="Sistema com falha"
  />

  <input
    type="text"
    value={editingOrdem.servicoSolicitado}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, servicoSolicitado: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="Serviço Solicitado"
  />

  <input
    type="text"
    value={editingOrdem.servicoRealizado ?? ""}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, servicoRealizado: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="Serviço Realizado"
  />

  <input
    type="text"
    value={editingOrdem.situacaoAtual}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, situacaoAtual: e.target.value })}
    className="w-full rounded border px-3 py-2"
    placeholder="Situação Atual"
  />

  <input
    type="date"
    value={editingOrdem.inicioServico}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, inicioServico: e.target.value })}
    className="w-full rounded border px-3 py-2"
  />

  <input
    type="date"
    value={editingOrdem.fimServico}
    onChange={(e) => setEditingOrdem({ ...editingOrdem, fimServico: e.target.value })}
    className="w-full rounded border px-3 py-2"
  />
</div>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="rounded bg-gray-400 px-4 py-2 text-white"
                onClick={() => setEditingOrdem(null)}
              >
                Cancelar
              </button>
              <button
                className="rounded bg-blue-600 px-4 py-2 text-white"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    await fetch(
                      `http://localhost:3001/ordens-servico/${editingOrdem.id}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(editingOrdem),
                      }
                    );
                    alert("Ordem atualizada com sucesso!");
                    setEditingOrdem(null);
                  } catch (err) {
                    alert("Erro ao atualizar ordem");
                  }
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
