import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-honeycomb min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brown-950 font-['Playfair_Display'] mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-honey-500 mx-auto rounded-full mb-6"></div>
          <p className="text-brown-600 max-w-2xl mx-auto text-lg">
            Have questions about our honey or your order? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Info Side */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-honey-100 flex items-start gap-4">
              <div className="bg-honey-100 p-3 rounded-xl text-honey-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brown-900 mb-1">Email Us</h3>
                <p className="text-sm text-brown-600">hello@naturesgold.com</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-honey-100 flex items-start gap-4">
              <div className="bg-honey-100 p-3 rounded-xl text-honey-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brown-900 mb-1">Call Us</h3>
                <p className="text-sm text-brown-600">+1 (555) 123-4567</p>
                <p className="text-xs text-brown-400 mt-1">Mon-Fri: 9am - 6pm</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-honey-100 flex items-start gap-4">
              <div className="bg-honey-100 p-3 rounded-xl text-honey-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-brown-900 mb-1">Our Hive</h3>
                <p className="text-sm text-brown-600">123 Honeybee Lane, Hive City</p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-honey-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-honey-50 rounded-full -mr-16 -mt-16 z-0"></div>
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-honey-200 focus:ring-2 focus:ring-honey-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-honey-200 focus:ring-2 focus:ring-honey-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-honey-200 focus:ring-2 focus:ring-honey-500 outline-none resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-lg shadow-honey-200 shadow-lg">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
