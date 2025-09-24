"use client";

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import React, { useState, FormEvent } from "react";
import { ChevronDownIcon } from "@/icons";
import DatePicker from "@/components/form/date-picker";

export default function PtecCom() {
  const [ordemServico, setOrdemServico] = useState("");
  const [situacao, setSituacao] = useState("");
  const [om, setOm] = useState("");
  const [marcaMaterial, setMarcaMaterial] = useState("");
  const [mem, setMem] = useState("");
  const [sistema, setSistema] = useState("");
  const [servicoSolicitado, setServicoSolicitado] = useState("");
  const [servicoRealizado, setServicoRealizado] = useState("");
  const [situacaoAtual, setSituacaoAtual] = useState("");
  const [inicioServico, setInicioServico] = useState("");
  const [fimServico, setFimServico] = useState("");

  const options = [
    { value: "aberta", label: "Aberta" },
    { value: "fechada", label: "Fechada" },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ordemServico,
      situacao,
      om,
      marcaMaterial,
      mem,
      sistema,
      servicoSolicitado,
      servicoRealizado,
      situacaoAtual,
      inicioServico,
      fimServico,
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3001/ordens-servico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) throw new Error("Erro ao salvar ordem");

      const data = await response.json();
      alert("Ordem salva com sucesso!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar formulário");
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Ptec Com" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Posto Técnico de Comunicações
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ComponentCard title="" desc="">
            <div>
              <Label>N° ordem de serviço</Label>
              <Input
                type="text"
                value={ordemServico}
                onChange={(e) => setOrdemServico(e.target.value)}
              />
            </div>

            <div>
              <Label>Situação da Ordem de Serviço</Label>
              <div className="relative">
                <Select
                  options={options}
                  placeholder="Selecione uma situação"
                  onChange={(value) => setSituacao(value)}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            <div>
              <Label>Organização Militar de origem</Label>
              <Input
                type="text"
                value={om}
                onChange={(e) => setOm(e.target.value)}
              />
            </div>

            <div>
              <Label>Marca do Material</Label>
              <Input
                type="text"
                value={marcaMaterial}
                onChange={(e) => setMarcaMaterial(e.target.value)}
              />
            </div>

            <div>
              <Label>Tipo de Material de Emprego Militar</Label>
              <Input
                type="text"
                value={mem}
                onChange={(e) => setMem(e.target.value)}
              />
            </div>

            <div>
              <Label>Tipo de sistema com falha</Label>
              <Input
                type="text"
                value={sistema}
                onChange={(e) => setSistema(e.target.value)}
              />
            </div>

            <div>
              <Label>Serviço Solicitado</Label>
              <Input
                type="text"
                value={servicoSolicitado}
                onChange={(e) => setServicoSolicitado(e.target.value)}
              />
            </div>

            <div>
              <Label>Serviço Realizado</Label>
              <Input
                type="text"
                value={servicoRealizado}
                onChange={(e) => setServicoRealizado(e.target.value)}
              />
            </div>

            <div>
              <Label>Situação Atual</Label>
              <Input
                type="text"
                value={situacaoAtual}
                onChange={(e) => setSituacaoAtual(e.target.value)}
              />
            </div>

            <div>
              <DatePicker
                id="data-inicio"
                label="Início do Serviço"
                placeholder="Selecione uma data"
                onChange={(dates, currentDateString) =>
                  setInicioServico(currentDateString)
                }
              />
            </div>

            <div>
              <DatePicker
                id="data-fim"
                label="Final do Serviço"
                placeholder="Selecione uma data"
                onChange={(dates, currentDateString) =>
                  setFimServico(currentDateString)
                }
              />
            </div>

            <div className="pt-4 text-center">
              <button
                type="submit"
                className="rounded bg-primary px-6 py-2 font-medium text-white transition hover:bg-opacity-90"
              >
                Salvar Ordem de Serviço
              </button>
            </div>
          </ComponentCard>
        </form>
      </div>
    </div>
  );
}
