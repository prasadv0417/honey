import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  // images can be [{url, public_id}] (Cloudinary) or [string] (plain URL)
  const getImageUrl = () => {
    if (!product.images || product.images.length === 0) return 'https://images.unsplash.com/photo-1587049352847-4d431cde70c2?auto=format&fit=crop&q=80&w=800';
    const first = product.images[0];
    return typeof first === 'string' ? first : first.url;
  };

  // Get lowest size price
  const displayPrice = product.sizes?.length > 0
    ? Math.min(...product.sizes.map(s => s.price))
    : product.price;

  return (
    <div className="glass-card overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-honey-100 bg-white">
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={getImageUrl()}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-xl font-bold text-brown-950 font-['Playfair_Display'] hover:text-honey-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <span className="text-lg font-bold text-honey-600">₹{displayPrice}</span>
        </div>

        <p className="text-brown-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-honey-100">
          <span className="text-xs font-medium text-brown-500 bg-honey-50 px-2.5 py-1 rounded-full border border-honey-200">
            {product.category}
          </span>
          <Link to={`/product/${product._id}`} className="flex items-center gap-2 text-sm font-semibold text-honey-600 hover:text-white bg-transparent hover:bg-honey-500 border-2 border-honey-500 px-4 py-2 rounded-full transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
