import React from 'react';

const About = () => {
  return (
    <div className="bg-honeycomb min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-brown-950 mb-6 font-['Playfair_Display']">
            Our <span className="text-honey-500">Story</span>
          </h1>
          <div className="w-24 h-1 bg-honey-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-brown-700 max-w-3xl mx-auto leading-relaxed font-light">
            Founded with a passion for nature's purest gift, Nature's Gold is dedicated to bringing you raw,
            unfiltered honey that tastes just like it does in the hive.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&q=80&w=800"
                alt="Beekeeper at work"
                className="rounded-3xl shadow-2xl border-4 border-white transform -rotate-2"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-brown-900 font-['Playfair_Display']">From Hive to Table</h2>
              <p className="text-brown-700 leading-relaxed text-lg">
                Our journey began in the lush wildflower meadows where we first discovered the incredible variety of
                flavors that bees create. We realized that most commercial honey is processed so much that it loses
                the very essence that makes it special.
              </p>
              <p className="text-brown-700 leading-relaxed text-lg">
                At Nature's Gold, we do things differently. We partner with local beekeepers who respect their bees
                and the environment. Our honey is never heated, never micro-filtered, and never blended with syrups.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-xl border border-honey-100 shadow-sm">
                  <h4 className="font-bold text-honey-600 mb-1 tracking-tight">COLOURED BY NATURE</h4>
                  <p className="text-xs text-brown-500">No artificial colors or flavors, ever.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-honey-100 shadow-sm">
                  <h4 className="font-bold text-honey-600 mb-1 tracking-tight">ENVIRONMENT FIRST</h4>
                  <p className="text-xs text-brown-500">Supporting bee populations locally.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-brown-950 text-white mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-['Playfair_Display'] mb-10">Our Vision</h2>
          <p className="text-xl text-white/80 leading-relaxed font-light italic">
            "To restore the connection between people and the natural world through the simple,
            honest beauty of raw honey, while ensuring the thriving future of our planet's
            most vital pollinators."
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
