import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { toast } from 'react-toastify';

const MOCK_PRODUCT = {
  _id: '1',
  name: 'Raw Forest Honey',
  description: '100% pure raw honey sourced from deep forest flora. Rich in antioxidants and natural enzymes. Unpasteurized and unfiltered to retain all natural goodness.',
  price: 499,
  category: 'Raw Honey',
  images: ['https://images.unsplash.com/photo-1587049352847-4d431cde70c2?auto=format&fit=crop&q=80&w=800'],
  sizes: [
    { size: '250g', price: 299, stock: 50 },
    { size: '500g', price: 499, stock: 35 },
    { size: '1kg', price: 899, stock: 15 }
  ],
  ingredients: '100% Pure Raw Honey',
  healthBenefits: ['Boosts Immunity', 'Soothes Sore Throat', 'Rich in Antioxidants', 'Natural Energy Booster']
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1); // Default to second size (e.g. 500g)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart({
      ...product,
      size: product.sizes[selectedSizeIndex].size,
      price: product.sizes[selectedSizeIndex].price,
      quantity
    }));
    toast.success('Item added to cart!');
  };

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProduct(MOCK_PRODUCT);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <Loader fullScreen />;

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-honeycomb">
      <h2 className="text-3xl font-bold text-brown-900 mb-4 font-['Playfair_Display']">Product not found</h2>
      <Link to="/products" className="btn-primary">Return to Shop</Link>
    </div>
  );

  const activeSize = product.sizes[selectedSizeIndex];

  return (
    <div className="bg-honeycomb min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center text-brown-600 hover:text-honey-600 font-medium mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Collection
        </Link>

        <div className="glass-card overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image Gallery */}
            <div className="md:w-1/2 p-12 bg-white flex items-center justify-center">
              <div className="relative group w-full max-w-lg aspect-square">
                <div className="absolute inset-0 bg-honey-200 rounded-full filter blur-3xl opacity-20 transform scale-90 group-hover:scale-100 transition-transform duration-700"></div>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500 border border-honey-100"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8 md:p-12 border-l border-honey-100 bg-honey-50/30">
              <span className="inline-block px-3 py-1 bg-honey-200 text-brown-900 text-sm font-semibold rounded-full mb-4 shadow-sm border border-honey-300">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-brown-950 font-['Playfair_Display'] mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="text-3xl font-bold text-honey-600 mb-6 drop-shadow-sm">
                ₹{activeSize.price}
              </div>

              <p className="text-brown-700 text-lg leading-relaxed mb-8 border-b border-honey-200 pb-8">
                {product.description}
              </p>

              {/* Sizes Selection */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-brown-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  Select Size
                </h3>
                <div className="flex gap-4">
                  {product.sizes.map((s, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSizeIndex(index)}
                      className={`px-5 py-3 rounded-xl border-2 font-semibold transition-all duration-300 ${selectedSizeIndex === index
                        ? 'border-honey-500 bg-honey-50 text-brown-900 shadow-md transform -translate-y-1'
                        : 'border-honey-200 bg-white text-brown-500 hover:border-honey-400 focus:outline-none'
                        }`}
                    >
                      <div className="text-sm">{s.size}</div>
                      <div className="text-xs font-normal mt-1 opacity-80 text-brown-600">₹{s.price}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-sm flex items-center">
                  {activeSize.stock > 0 ? (
                    <span className="text-green-600 font-medium flex items-center">
                      <Check className="w-4 h-4 mr-1" /> In Stock ({activeSize.stock} available)
                    </span>
                  ) : (
                    <span className="text-red-500 font-medium tracking-wide">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-end gap-6 mb-10">
                <div>
                  <label className="block text-sm font-bold text-brown-900 uppercase tracking-wider mb-3">Quantity</label>
                  <div className="flex items-center border-2 border-honey-200 rounded-xl bg-white shadow-sm overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-3 text-brown-600 hover:bg-honey-100 transition-colors focus:outline-none focus:bg-honey-200"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-brown-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-3 text-brown-600 hover:bg-honey-100 transition-colors focus:outline-none focus:bg-honey-200"
                      disabled={quantity >= activeSize.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={addToCartHandler}
                  className={`flex-1 py-4 px-6 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition-all duration-300 transform ${activeSize.stock > 0
                    ? 'bg-brown-900 text-honey-400 hover:bg-brown-800 hover:-translate-y-1 hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  disabled={activeSize.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  {activeSize.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Extras */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-honey-200">
                <div>
                  <h4 className="flex items-center text-brown-900 font-bold mb-3 font-['Playfair_Display'] text-lg">
                    <Leaf className="w-5 h-5 text-honey-600 mr-2" /> Ingredients
                  </h4>
                  <p className="text-brown-700 text-sm leading-relaxed">{product.ingredients}</p>
                </div>
                <div>
                  <h4 className="flex items-center text-brown-900 font-bold mb-3 font-['Playfair_Display'] text-lg">
                    <Heart className="w-5 h-5 text-honey-600 mr-2" /> Benefits
                  </h4>
                  <ul className="text-sm text-brown-700 space-y-2">
                    {product.healthBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-honey-500 mr-2 mt-1text-xs">●</span>
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
