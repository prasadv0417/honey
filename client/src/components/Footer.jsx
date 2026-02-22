import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brown-950 text-honey-50 pt-16 pb-8 border-t-4 border-honey-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl">🍯</span>
              <h2 className="text-2xl font-['Playfair_Display'] font-bold text-honey-400">Nature's Gold</h2>
            </div>
            <p className="text-brown-300 mb-6 max-w-md leading-relaxed">
              We bring you the purest, most natural honey straight from our hives to your table. Experience the rich taste of nature's sweetest gift, harvested with love and care.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-['Playfair_Display'] text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-brown-300 hover:text-honey-400 transition-colors">Home</a></li>
              <li><a href="/products" className="text-brown-300 hover:text-honey-400 transition-colors">Shop</a></li>
              <li><a href="/about" className="text-brown-300 hover:text-honey-400 transition-colors">Our Story</a></li>
              <li><a href="/contact" className="text-brown-300 hover:text-honey-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold font-['Playfair_Display'] text-white mb-4">Contact Info</h3>
            <ul className="space-y-3 text-brown-300">
              <li>123 Honeybee Lane, Hive City</li>
              <li>hello@naturesgold.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-brown-400">
          <p>© {new Date().getFullYear()} Nature's Gold. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-honey-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-honey-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
