
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { cn } from '@/lib/utils';

interface AssetPerformance {
  name: string;
  ticker: string;
  category: string;
  value: number;
  change: {
    value: number;
    percentage: number;
  }
}

// Mock data
const topPerformers: AssetPerformance[] = [
  { 
    name: 'Apple', 
    ticker: 'AAPL', 
    category: 'Actions',
    value: 10000, 
    change: { value: 800, percentage: 8.0 } 
  },
  { 
    name: 'Microsoft', 
    ticker: 'MSFT', 
    category: 'Actions',
    value: 8000, 
    change: { value: 600, percentage: 7.5 } 
  },
  { 
    name: 'Bitcoin', 
    ticker: 'BTC', 
    category: 'Crypto',
    value: 5000, 
    change: { value: 350, percentage: 7.0 } 
  }
];

const worstPerformers: AssetPerformance[] = [
  { 
    name: 'GameStop', 
    ticker: 'GME', 
    category: 'Actions',
    value: 1500, 
    change: { value: -300, percentage: -20.0 } 
  },
  { 
    name: 'AMC Entertainment', 
    ticker: 'AMC', 
    category: 'Actions',
    value: 2000, 
    change: { value: -250, percentage: -12.5 } 
  },
  { 
    name: 'Dogecoin', 
    ticker: 'DOGE', 
    category: 'Crypto',
    value: 800, 
    change: { value: -80, percentage: -10.0 } 
  }
];

interface PerformanceListProps {
  className?: string;
}

const PerformanceList: React.FC<PerformanceListProps> = ({ className }) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  // Asset card component for each list item
  const AssetCard = ({ asset }: { asset: AssetPerformance }) => {
    const isPositive = asset.change.percentage >= 0;
    
    return (
      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{asset.name}</span>
            <span className="text-xs text-muted-foreground">{asset.ticker}</span>
          </div>
          <Badge variant="default" className="w-fit">
            {asset.category}
          </Badge>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span className="font-medium">{formatCurrency(asset.value)}</span>
          <div className={cn(
            "flex items-center gap-1 text-sm",
            isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{isPositive ? '+' : ''}{asset.change.percentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Performers */}
      <Card className={cn("w-full", className)}>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Top Performances</h3>
        </div>
        
        <div className="space-y-2">
          {topPerformers.map((asset, index) => (
            <AssetCard key={`top-${index}`} asset={asset} />
          ))}
        </div>
      </Card>
      
      {/* Worst Performers */}
      <Card className={cn("w-full", className)}>
        <div className="mb-4">
          <h3 className="text-lg font-medium">Pires Performances</h3>
        </div>
        
        <div className="space-y-2">
          {worstPerformers.map((asset, index) => (
            <AssetCard key={`worst-${index}`} asset={asset} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PerformanceList;
