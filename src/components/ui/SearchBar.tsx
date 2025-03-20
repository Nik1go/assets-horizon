
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Rechercher un actif...',
  onSearch,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "relative w-full max-w-2xl mx-auto",
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn(
            "w-full py-3 pl-10 pr-10 bg-white dark:bg-black",
            "border rounded-full shadow-sm focus-ring",
            "transition-all duration-300",
            "placeholder:text-muted-foreground/60"
          )}
          placeholder={placeholder}
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
