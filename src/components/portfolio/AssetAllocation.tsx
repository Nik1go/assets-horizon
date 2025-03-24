import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import CustomCard from "@/components/ui/custom-card";

// Mock data for asset allocation
const mockData = [
  { name: "Actions", value: 50000, color: "#3b82f6" }, // Blue
  { name: "Obligations", value: 30000, color: "#8b5cf6" }, // Purple
  { name: "Immobilier", value: 70000, color: "#22c55e" }, // Green
  { name: "Liquidités", value: 20000, color: "#f59e0b" }, // Yellow
  { name: "Crypto", value: 10000, color: "#ef4444" }, // Red
];

interface AssetAllocationProps {
  className?: string;
}

const AssetAllocation: React.FC<AssetAllocationProps> = ({ className }) => {
  const totalValue = mockData.reduce((sum, item) => sum + item.value, 0);

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Custom renderer for the Legend
  const renderLegend = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-4">
        {mockData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">
              {entry.name}
              <span className="ml-1 text-muted-foreground">
                ({formatPercentage(entry.value / totalValue)})
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <CustomCard className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Allocation des actifs</h3>
      </div>

      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {mockData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                  minimumFractionDigits: 0,
                }).format(value),
                "Valeur",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {renderLegend()}
    </CustomCard>
  );
};

export default AssetAllocation;
