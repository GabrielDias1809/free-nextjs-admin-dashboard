"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OrdemDeServico {
  situacao: string;
}

export default function RadialBarSituacao() {
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

        const counts: Record<string, number> = {};
        data.forEach((ordem) => {
          const situacao = ordem.situacao || "Não Informada";
          counts[situacao] = (counts[situacao] || 0) + 1;
        });

        setLabels(Object.keys(counts));
        setSeries(Object.values(counts));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          offsetX: -8,
          fontSize: "16px",
          formatter: function (seriesName, opts) {
            return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`;
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div className="max-w-lg mx-auto">
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={390}
      />
    </div>
  );
}
