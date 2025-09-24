"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Carregamento dinâmico do ApexChart (para evitar SSR)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface OrdemDeServico {
  situacao: string;
  dataInicio: string;
}

export default function LineChartStatus() {
  const [seriesData, setSeriesData] = useState([
    { name: "Abertas", data: Array(12).fill(0) },
    { name: "Fechadas", data: Array(12).fill(0) },
  ]);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3001/ordens-servico", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data: OrdemDeServico[] = await res.json();

        const abertas = Array(12).fill(0);
        const fechadas = Array(12).fill(0);

        data.forEach((ordem) => {
          const monthIndex = new Date(ordem.dataInicio).getMonth();
          if (ordem.situacao.toLowerCase() === "aberta") {
            abertas[monthIndex]++;
          } else if (ordem.situacao.toLowerCase() === "fechada") {
            fechadas[monthIndex]++;
          }
        });

        setSeriesData([
          { name: "Abertas", data: abertas },
          { name: "Fechadas", data: fechadas },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, []);

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.55, opacityTo: 0 },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy" },
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "",
        style: { fontSize: "0px" },
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartStatus" className="min-w-[1000px]">
        <ReactApexChart
          options={options}
          series={seriesData}
          type="area"
          height={310}
        />
      </div>
    </div>
  );
}
