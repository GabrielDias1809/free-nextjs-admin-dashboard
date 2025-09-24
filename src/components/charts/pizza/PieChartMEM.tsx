"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OrdemDeServico {
  mem: string;
}

export default function PolarAreaMEM() {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/ordens-servico", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: OrdemDeServico[] = await res.json();

        // Agrupar por MEM
        const memCount: Record<string, number> = {};
        data.forEach((ordem) => {
          const tipo = ordem.mem || "Não Informado";
          memCount[tipo] = (memCount[tipo] || 0) + 1;
        });

        setLabels(Object.keys(memCount));
        setSeries(Object.values(memCount));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      width: 380,
      type: "polarArea",
      toolbar: { show: false },
    },
    labels,
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: "light",
        shadeIntensity: 0.6,
      },
    },
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-2 text-center text-sm text-gray-600">
        Distribuição de ordens por Tipo de Material (MEM)
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="polarArea"
        width={480}
      />
    </div>
  );
}
