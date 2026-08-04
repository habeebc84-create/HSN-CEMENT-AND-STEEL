import React from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

interface ProductFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory,
  selectedBrand, setSelectedBrand,
  selectedSize, setSelectedSize,
  sortBy, setSortBy
}) => {
  const { categories, brands } = useStore();

  const steelSizes = ['6 mm', '8 mm', '10 mm', '12 mm', '16 mm', '20 mm', '25 mm', '32 mm'];
  const nailSizes = ['1 inch', '1.5 inch', '2 inch', '2.5 inch', '3 inch', '4 inch', '5 inch', '6 inch'];
  const allSizes = [...steelSizes, ...nailSizes];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedSize('All');
    setSortBy('featured');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || selectedBrand !== 'All' || selectedSize !== 'All' || sortBy !== 'featured';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-8 space-y-4 shadow-xl">
      
      {/* Top Search & Reset Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Box */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search cement, steel sizes (12mm, 16mm), binding wire, nails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 pl-11 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-pink-500 transition"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-48">
            <ArrowUpDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 pl-9 pr-4 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-500 appearance-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2.5 rounded-xl flex items-center space-x-1 shrink-0 transition"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
            selectedCategory === 'All'
              ? 'bg-pink-600 text-white border-pink-500 shadow-md font-extrabold'
              : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
          }`}
        >
          All Products
        </button>

        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
              selectedCategory === cat.name
                ? 'bg-pink-600 text-white border-pink-500 shadow-md font-extrabold'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Brand & Size Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
        
        {/* Brand Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-400 min-w-[50px] flex items-center space-x-1">
            <Filter className="w-3 h-3 text-pink-400" />
            <span>Brand:</span>
          </label>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-500 cursor-pointer"
          >
            <option value="All">All Brands</option>
            {brands.map(b => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Size Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-400 min-w-[40px]">Size:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 px-3 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-500 cursor-pointer"
          >
            <option value="All">All Available Sizes</option>
            {allSizes.map(sz => (
              <option key={sz} value={sz}>{sz}</option>
            ))}
          </select>
        </div>

      </div>

    </div>
  );
};
