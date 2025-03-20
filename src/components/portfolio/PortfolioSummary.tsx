
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../ui/Card';
import { cn } from '@/lib/utils';

interface PortfolioSummaryProps {
  totalValue: number;
  change: {
    value: number;
    percentage: number;
  };
  period?: string;
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  totalValue,
  change,
  period = 'aujourd\'hui'
}) => {
  const isPositive = change.value >= 0;
  
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <Card className="w-full" glassEffect>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-medium text-muted-foreground">Mon Patrimoine</h2>
          <span className="text-sm text-muted-foreground">{period}</span>
        </div>
        
        <motion.div 
          className="mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-baseline">
            <span className="text-4xl md:text-5xl font-bold tracking-tight">
              {formatter.format(totalValue)}
            </span>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-2 mt-1">
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>
              {isPositive ? '+' : ''}{formatter.format(change.value)} 
              <span className="ml-1">({isPositive ? '+' : ''}{change.percentage.toFixed(2)}%)</span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioSummary;
