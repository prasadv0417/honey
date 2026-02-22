import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const Home = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();

  // Show 3 featured products on home page
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="bg-honeycomb">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pb-32">
        <div className="absolute inset-0 bg-honey-50/80 backdrop-blur-sm z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-honey-100 text-honey-800 font-semibold tracking-wider text-sm mb-6 border border-honey-200 shadow-sm">
              100% PURE &amp; NATURAL
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-brown-950 mb-6 drop-shadow-sm leading-tight font-['Playfair_Display']">
              Nature's Golden <span className="text-honey-500">Miracle</span>
            </h1>
            <p className="text-xl text-brown-700 mb-10 leading-relaxed font-light">
              Experience the rich, authentic taste of raw honey straight from the hive to your table.
              Unfiltered, unpasteurized, and full of natural goodness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products" className="btn-primary text-lg">
                Shop Collection
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-honey-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1587049352847-4d431cde70c2?auto=format&fit=crop&q=80&w=800"
              alt="Jar of pure honey"
              className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl transform hover:rotate-3 transition-transform duration-500 border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-y border-honey-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="p-6 rounded-2xl bg-honey-50 border border-honey-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">🐝</div>
              <h3 className="text-xl font-bold font-['Playfair_Display'] text-brown-900 mb-3">Sustainable Hiving</h3>
              <p className="text-brown-600">Ethically sourced from local beekeepers who prioritize the health of the bees.</p>
            </div>
            <div className="p-6 rounded-2xl bg-honey-50 border border-honey-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-xl font-bold font-['Playfair_Display'] text-brown-900 mb-3">100% Raw &amp; Pure</h3>
              <p className="text-brown-600">Never heated or micro-filtered, retaining all natural pollen and enzymes.</p>
            </div>
            <div className="p-6 rounded-2xl bg-honey-50 border border-honey-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-5xl mb-4">🍯</div>
              <h3 className="text-xl font-bold font-['Playfair_Display'] text-brown-900 mb-3">Rich Flavor</h3>
              <p className="text-brown-600">Distinctive local flora creates a unique, robust flavor profile you'll love.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products — from real database */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-brown-950 mb-4 tracking-tight">
              Featured Collection
            </h2>
            <div className="w-24 h-1 bg-honey-500 mx-auto rounded-full mb-6"></div>
            <p className="text-brown-600 max-w-2xl mx-auto text-lg">
              Discover our most loved honey varieties, each with its own unique flavor profile and health benefits.
            </p>
          </div>

          {isLoading ? (
            <Loader />
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-brown-500">
              <p className="text-lg italic">No products found. Add some from the admin panel!</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <Link to="/products" className="btn-secondary text-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-brown-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold font-['Playfair_Display'] mb-4">Why Nature's Gold?</h2>
          <div className="w-16 h-1 bg-honey-400 mx-auto mb-10 rounded-full"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { emoji: '🌱', title: 'Organic', desc: 'No pesticides or additives' },
              { emoji: '❤️', title: 'Healthy', desc: 'Rich in enzymes & antioxidants' },
              { emoji: '🚚', title: 'Fast Delivery', desc: 'Pan-India shipping' },
              { emoji: '🔒', title: 'Secure', desc: 'SSL encrypted checkout' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h4 className="font-bold text-honey-300 mb-1">{item.title}</h4>
                <p className="text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
