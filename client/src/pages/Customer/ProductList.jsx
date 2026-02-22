import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import { Filter, Search } from 'lucide-react';

import { useGetProductsQuery } from '../../slices/productsApiSlice';

const ProductList = () => {
  const { data: products = [], isLoading: loading, error } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-honeycomb min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-brown-950 mb-4 tracking-tight">
            Our Honey Collection
          </h1>
          <div className="w-24 h-1 bg-honey-500 mx-auto rounded-full mb-6"></div>
          <p className="text-brown-600 max-w-2xl mx-auto text-lg">
            Explore our curated selection of raw, unfiltered honeys. Each jar is a unique expression of nature.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="glass-card p-6 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search honey..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-honey-200 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent bg-white/50 backdrop-blur-sm shadow-inner"
            />
            <Search className="absolute left-4 top-3.5 text-brown-400 w-5 h-5" />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 text-brown-600 mr-2 shrink-0">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter by:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${categoryFilter === category
                  ? 'bg-brown-900 text-white shadow-md'
                  : 'bg-white text-brown-700 border border-honey-200 hover:bg-honey-50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="text-center py-20 bg-red-50 text-red-600 rounded-2xl">{error?.data?.message || 'Error fetching products'}</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <h3 className="text-2xl font-bold font-['Playfair_Display'] text-brown-900 mb-2">No products found</h3>
            <p className="text-brown-600">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }}
              className="mt-6 btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
