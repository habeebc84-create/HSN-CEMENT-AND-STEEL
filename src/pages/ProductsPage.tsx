import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductFilter } from '../components/ProductFilter';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Product } from '../types';
import { PackageX } from 'lucide-react';

interface ProductsPageProps {
  initialCategory?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ initialCategory = 'All' }) => {
  const { products } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  // Filter Logic
  const filteredProducts = products.filter(p => {
    if (!p.enabled) return false;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = p.name.toLowerCase().includes(term);
      const matchBrand = p.brand.toLowerCase().includes(term);
      const matchCat = p.category.toLowerCase().includes(term);
      const matchDesc = p.description.toLowerCase().includes(term);
      const matchGrade = p.grade ? p.grade.toLowerCase().includes(term) : false;
      const matchSizes = p.sizes ? p.sizes.some(s => s.size.toLowerCase().includes(term)) : false;

      if (!matchName && !matchBrand && !matchCat && !matchDesc && !matchGrade && !matchSizes) {
        return false;
      }
    }

    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }

    if (selectedBrand !== 'All' && p.brand !== selectedBrand) {
      return false;
    }

    if (selectedSize !== 'All') {
      if (p.sizes) {
        const hasSize = p.sizes.some(s => s.size === selectedSize);
        if (!hasSize) return false;
      } else {
        return false;
      }
    }

    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <div className="py-10 bg-transparent min-h-screen relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-100">
            Construction Materials <span className="text-gradient theme-lovable text-gradient-animated">Catalogue</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Click any product card to view image zoom, specs, size options, and stock details.
          </p>
        </div>

        {/* Filter Toolbar */}
        <ProductFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400 font-semibold">
          <div>Showing <span className="text-white font-bold">{sortedProducts.length}</span> Products</div>
          {selectedCategory !== 'All' && (
            <span className="bg-blue-500/10 text-white px-2.5 py-1 rounded-lg border border-blue-500/30 font-bold">
              Category: {selectedCategory}
            </span>
          )}
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4">
            <PackageX className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-200">No Products Found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search criteria or resetting filters to view available materials.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelectProduct={(p) => setSelectedProductModal(p)}
              />
            ))}
          </div>
        )}

        {/* Product Details Lightbox Modal */}
        <ProductDetailModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
        />

      </div>
    </div>
  );
};
