"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OrdemDeServico {
  om: string;
}

export default function PieChartOM() {
  const [seriesData, setSeriesData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/ordens-servico", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: OrdemDeServico[] = await res.json();

        // Agrupar por OM
        const omCount: Record<string, number> = {};
        data.forEach((ordem) => {
          const om = ordem.om || "Não Informada";
          omCount[om] = (omCount[om] || 0) + 1;
        });

        setLabels(Object.keys(omCount));
        setSeriesData(Object.values(omCount));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    labels,
    legend: { position: "bottom" },
    colors: [
      "#465FFF",
      "#9CB9FF",
      "#FF8042",
      "#FFBB28",
      "#00C49F",
      "#8884d8",
      "#7E57C2",
      "#26A69A",
    ],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "pie",
      toolbar: { show: false },
    },
    tooltip: { enabled: true },
    dataLabels: {
      enabled: true,
      style: { colors: ["#000"], fontSize: "14px", fontWeight: 600 },
      formatter: (val: unknown) => {
        const num = typeof val === "number" ? val : Number(val);
        return isNaN(num) ? "" : `${num.toFixed(1)}%`;
      },
    },
    noData: {
      text: "Sem dados para exibir",
      align: "center",
      verticalAlign: "middle",
      style: { color: "#6B7280", fontSize: "14px" },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-2 text-center text-sm text-gray-600">
        Distribuição de ordens por Organização Militar
      </div>
      <ReactApexChart
        options={options}
        series={seriesData}
        type="pie"
        height={320}
      />
    </div>
  );
}
