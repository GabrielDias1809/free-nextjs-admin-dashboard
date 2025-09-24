"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OrdemDeServico {
  marcaMaterial: string;
}

export default function RadarChartMarca() {
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/ordens-servico", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: OrdemDeServico[] = await res.json();

        // Agrupar por marca
        const marcaCount: Record<string, number> = {};
        data.forEach((ordem) => {
          const marca = ordem.marcaMaterial || "Não Informada";
          marcaCount[marca] = (marcaCount[marca] || 0) + 1;
        });

        setLabels(Object.keys(marcaCount));
        setSeries([
          {
            name: "Quantidade de OS",
            data: Object.values(marcaCount),
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "radar",
      height: 400,
      toolbar: { show: false },
    },
    xaxis: {
      categories: labels,
      labels: {
        style: {
          colors: "#000", // nomes das marcas pretos
          fontSize: "14px",
          fontWeight: 600,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#000", // números pretos
        },
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.3,
    },
    markers: {
      size: 4,
    },
    colors: ["#1ab7ea"],
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-2 text-center text-sm text-gray-600">
        Distribuição de ordens por Marca
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="radar"
        height={400}
      />
    </div>
  );
}
