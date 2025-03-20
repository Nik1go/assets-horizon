
import React, { useState, useEffect } from 'react';
import PageTransition from '@/components/transitions/PageTransition';
import SearchBar from '@/components/ui/SearchBar';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { TrendingUp, TrendingDown, Star, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock asset categories for filtering
const assetCategories = [
  { id: 'all', label: 'Tous' },
  { id: 'stocks', label: 'Actions' },
  { id: 'bonds', label: 'Obligations' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'realestate', label: 'Immobilier' },
  { id: 'cash', label: 'Liquidités' },
];

// Mock search results
const mockSearchResults = [
  {
    id: '1',
    name: 'Apple Inc.',
    ticker: 'AAPL',
    category: 'Actions',
    price: 178.72,
    change: 2.45,
    isInPortfolio: true,
  },
  {
    id: '2',
    name: 'Microsoft Corporation',
    ticker: 'MSFT',
    category: 'Actions',
    price: 337.50,
    change: 0.75,
    isInPortfolio: true,
  },
  {
    id: '3',
    name: 'Amazon.com Inc.',
    ticker: 'AMZN',
    category: 'Actions',
    price: 145.68,
    change: -1.23,
    isInPortfolio: false,
  },
  {
    id: '4',
    name: 'Bitcoin',
    ticker: 'BTC',
    category: 'Crypto',
    price: 37584.21,
    change: 3.81,
    isInPortfolio: true,
  },
  {
    id: '5',
    name: 'Ethereum',
    ticker: 'ETH',
    category: 'Crypto',
    price: 2197.46,
    change: -2.15,
    isInPortfolio: false,
  },
  {
    id: '6',
    name: 'SCPI Rivoli Avenir Patrimoine',
    ticker: 'RAP',
    category: 'Immobilier',
    price: 286.75,
    change: 0.25,
    isInPortfolio: true,
  },
];

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState(mockSearchResults);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term) {
      setResults(mockSearchResults);
      return;
    }
    
    // Filter results based on search term and selected category
    const filtered = mockSearchResults.filter(asset => {
      const matchesTerm = 
        asset.name.toLowerCase().includes(term.toLowerCase()) ||
        asset.ticker.toLowerCase().includes(term.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        asset.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesTerm && matchesCategory;
    });
    
    setResults(filtered);
  };
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      handleSearch(searchTerm);
      return;
    }
    
    // Filter results based on category and existing search term
    const filtered = mockSearchResults.filter(asset => {
      const matchesTerm = 
        !searchTerm || 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.ticker.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = asset.category.toLowerCase() === category.toLowerCase();
      
      return matchesTerm && matchesCategory;
    });
    
    setResults(filtered);
  };
  
  // Toggle asset in portfolio (mock)
  const toggleAssetInPortfolio = (id: string) => {
    setResults(prevResults => 
      prevResults.map(asset => 
        asset.id === id 
          ? { ...asset, isInPortfolio: !asset.isInPortfolio } 
          : asset
      )
    );
  };
  
  return (
    <PageTransition>
      <div className="container mx-auto px-4 md:px-6 pt-24 pb-12">
        <div className="space-y-8 max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Rechercher des actifs</h1>
            <SearchBar 
              placeholder="Rechercher par nom ou symbole..."
              onSearch={handleSearch}
              className="mb-8"
            />
          </div>
          
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {assetCategories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Search results */}
          <div className="space-y-4 mt-8">
            {results.length > 0 ? (
              results.map(asset => (
                <Card key={asset.id} className="hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{asset.name}</h3>
                        <span className="text-sm text-muted-foreground">{asset.ticker}</span>
                      </div>
                      <Badge variant="default" className="w-fit">
                        {asset.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="font-medium">
                          {asset.price.toLocaleString('fr-FR', {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 2
                          })}
                        </span>
                        <div className={cn(
                          "flex items-center gap-1 text-sm",
                          asset.change >= 0 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-red-600 dark:text-red-400"
                        )}>
                          {asset.change >= 0 
                            ? <TrendingUp size={14} /> 
                            : <TrendingDown size={14} />
                          }
                          <span>
                            {asset.change >= 0 ? '+' : ''}{asset.change}%
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleAssetInPortfolio(asset.id)}
                        className="p-2 rounded-full hover:bg-muted transition-colors focus-ring"
                        aria-label={asset.isInPortfolio ? "Retirer du portefeuille" : "Ajouter au portefeuille"}
                      >
                        {asset.isInPortfolio ? (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <StarOff className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun résultat trouvé pour votre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Search;
