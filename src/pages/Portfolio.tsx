import { useState, useEffect } from "react";
import PageTransition from "@/components/transitions/PageTransition";
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CustomBadge from "@/components/ui/custom-badge";
import CustomCard from "@/components/ui/custom-card";
import { Card } from "@/components/ui/card";

// Asset portfolio categories with mock data
const portfolioCategories = [
  {
    id: "stocks",
    name: "Actions",
    totalValue: 50000,
    change: { value: 1200, percentage: 2.46 },
    assets: [
      {
        id: "1",
        name: "Apple Inc.",
        ticker: "AAPL",
        quantity: 25,
        price: 178.72,
        value: 4468,
        change: 2.45,
      },
      {
        id: "2",
        name: "Microsoft Corporation",
        ticker: "MSFT",
        quantity: 12,
        price: 337.5,
        value: 4050,
        change: 0.75,
      },
      {
        id: "3",
        name: "Google",
        ticker: "GOOGL",
        quantity: 15,
        price: 133.2,
        value: 1998,
        change: 1.23,
      },
    ],
  },
  {
    id: "crypto",
    name: "Crypto",
    totalValue: 10000,
    change: { value: -800, percentage: -7.41 },
    assets: [
      {
        id: "4",
        name: "Bitcoin",
        ticker: "BTC",
        quantity: 0.15,
        price: 37584.21,
        value: 5637.63,
        change: 3.81,
      },
      {
        id: "5",
        name: "Ethereum",
        ticker: "ETH",
        quantity: 2,
        price: 2197.46,
        value: 4394.92,
        change: -2.15,
      },
    ],
  },
  {
    id: "realestate",
    name: "Immobilier",
    totalValue: 70000,
    change: { value: 350, percentage: 0.5 },
    assets: [
      {
        id: "6",
        name: "SCPI Rivoli Avenir Patrimoine",
        ticker: "RAP",
        quantity: 100,
        price: 286.75,
        value: 28675,
        change: 0.25,
      },
      {
        id: "7",
        name: "Appartement Paris",
        ticker: "IMMO-1",
        quantity: 1,
        price: 41325,
        value: 41325,
        change: 0.75,
      },
    ],
  },
  {
    id: "cash",
    name: "Liquidités",
    totalValue: 20000,
    change: { value: 0, percentage: 0 },
    assets: [
      {
        id: "8",
        name: "Compte courant",
        ticker: "CASH-1",
        quantity: 1,
        price: 8000,
        value: 8000,
        change: 0,
      },
      {
        id: "9",
        name: "Livret A",
        ticker: "CASH-2",
        quantity: 1,
        price: 12000,
        value: 12000,
        change: 0,
      },
    ],
  },
];

const Portfolio: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate total portfolio value
  const totalPortfolioValue = portfolioCategories.reduce(
    (sum, category) => sum + category.totalValue,
    0
  );

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="space-y-8 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-3">Mon Portefeuille</h1>
            <p className="text-xl font-medium text-primary">
              {formatCurrency(totalPortfolioValue)}
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {portfolioCategories.map((category) => {
              const isExpanded = expandedCategories.includes(category.id);
              const isPositive = category.change.percentage >= 0;

              return (
                <div key={category.id} className="space-y-2">
                  {/* Category header */}
                  <Card
                    className="cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown size={20} />
                        ) : (
                          <ChevronRight size={20} />
                        )}
                        <h2 className="text-lg font-medium">{category.name}</h2>
                        <CustomBadge
                          variant={
                            isPositive
                              ? "success"
                              : category.change.percentage < 0
                              ? "danger"
                              : "default"
                          }
                          className="hidden sm:inline-flex"
                        >
                          {isPositive ? "+" : ""}
                          {category.change.percentage.toFixed(2)}%
                        </CustomBadge>
                      </div>

                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex items-center gap-1 text-sm",
                            isPositive
                              ? "text-green-600 dark:text-green-400"
                              : category.change.percentage < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-muted-foreground"
                          )}
                        >
                          {isPositive ? (
                            <TrendingUp size={16} />
                          ) : category.change.percentage < 0 ? (
                            <TrendingDown size={16} />
                          ) : null}
                          <span className="md:hidden">
                            {isPositive ? "+" : ""}
                            {category.change.percentage.toFixed(2)}%
                          </span>
                        </div>
                        <span className="font-medium">
                          {formatCurrency(category.totalValue)}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Expanded category assets */}
                  {isExpanded && (
                    <div className="space-y-2 pl-8">
                      {category.assets.map((asset) => {
                        const assetIsPositive = asset.change >= 0;

                        return (
                          <CustomCard key={asset.id} className="hover-lift">
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    {asset.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {asset.ticker}
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {asset.quantity}{" "}
                                  {asset.quantity > 1 ? "unités" : "unité"} ×{" "}
                                  {asset.price.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </div>
                              </div>

                              <div className="flex flex-col items-end">
                                <span className="font-medium">
                                  {formatCurrency(asset.value)}
                                </span>
                                <div
                                  className={cn(
                                    "flex items-center gap-1 text-sm",
                                    assetIsPositive
                                      ? "text-green-600 dark:text-green-400"
                                      : asset.change < 0
                                      ? "text-red-600 dark:text-red-400"
                                      : "text-muted-foreground"
                                  )}
                                >
                                  {assetIsPositive ? (
                                    <TrendingUp size={14} />
                                  ) : asset.change < 0 ? (
                                    <TrendingDown size={14} />
                                  ) : null}
                                  <span>
                                    {assetIsPositive ? "+" : ""}
                                    {asset.change}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CustomCard>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Portfolio;
