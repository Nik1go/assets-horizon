
import React, { useEffect } from 'react';
import PageTransition from '@/components/transitions/PageTransition';
import PortfolioSummary from '@/components/portfolio/PortfolioSummary';
import AssetChart from '@/components/portfolio/AssetChart';
import AssetAllocation from '@/components/portfolio/AssetAllocation';
import PerformanceList from '@/components/portfolio/PerformanceList';

const Index: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="space-y-8 max-w-6xl mx-auto">
          {/* Portfolio Summary */}
          <PortfolioSummary 
            totalValue={180000} 
            change={{ value: 2500, percentage: 1.41 }}
          />
          
          {/* Chart */}
          <AssetChart />
          
          {/* Asset Allocation */}
          <AssetAllocation />
          
          {/* Top & Worst Performers */}
          <PerformanceList />
        </div>
      </div>
    </PageTransition>
  );
};

export default Index;
