
import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {Card} from '@/components/ui/card'
import { cn } from '@/lib/utils';

interface TimeRange {
  id: string;
  label: string;
}

const timeRanges: TimeRange[] = [
  { id: 'day', label: '1J' },
  { id: 'week', label: '1S' },
  { id: 'month', label: '1M' },
  { id: 'year', label: '1A' },
  { id: 'all', label: 'Max' },
];

// Mock data - would be replaced with real data from API
const generateMockData = (range: string) => {
  // Different data ranges would be fetched from an API
  const baseData = [
    { date: 'Jan', value: 140000 },
    { date: 'Feb', value: 139000 },
    { date: 'Mar', value: 142000 },
    { date: 'Apr', value: 148000 },
    { date: 'May', value: 145000 },
    { date: 'Jun', value: 150000 },
    { date: 'Jul', value: 160000 },
    { date: 'Aug', value: 155000 },
    { date: 'Sep', value: 163000 },
    { date: 'Oct', value: 170000 },
    { date: 'Nov', value: 174000 },
    { date: 'Dec', value: 180000 },
  ];
  
  switch (range) {
    case 'day':
      return baseData.slice(-1);
    case 'week':
      return baseData.slice(-2);
    case 'month':
      return baseData.slice(-4);
    case 'year':
      return baseData;
    case 'all':
    default:
      return baseData;
  }
};

interface AssetChartProps {
  className?: string;
}

const AssetChart: React.FC<AssetChartProps> = ({ className }) => {
  const [selectedRange, setSelectedRange] = useState<string>('month');
  const data = generateMockData(selectedRange);
  
  // Determine if the trend is positive (last value > first value)
  const isPositive = data.length > 1 ? data[data.length - 1].value >= data[0].value : true;
  
  // Format the tooltip value
  const formatTooltipValue = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <Card className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Évolution du patrimoine</h3>
        <div className="flex space-x-1">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                selectedRange === range.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                  stopOpacity={0.3} 
                />
                <stop 
                  offset="95%" 
                  stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                  stopOpacity={0} 
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
            />
            <YAxis 
              domain={['dataMin - 5000', 'dataMax + 5000']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#888' }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              formatter={(value: number) => [formatTooltipValue(value), 'Valeur']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '8px 12px',
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? "#22c55e" : "#ef4444"} 
              fillOpacity={1}
              fill="url(#colorValue)" 
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default AssetChart;
