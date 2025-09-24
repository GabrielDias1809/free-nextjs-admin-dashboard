import PieChartStatus from "@/components/charts/pizza/PieChartCard";
import PieChartMarcaErros from "@/components/charts/pizza/PieChartMarcaErros";
import PieChartMEM from "@/components/charts/pizza/PieChartMEM";
import PieChartOM from "@/components/charts/pizza/PieChartOM";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PieChartStatus />
      <PieChartMarcaErros/>
      <PieChartOM />
      <PieChartMEM />
    </div>
  );
}
