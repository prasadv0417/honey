import React, { useState } from 'react';
import { Package, ShoppingBag, Users, DollarSign, Activity, ImagePlus, Edit, Trash2 } from 'lucide-react';
import { useGetProductsQuery, useUploadProductImageMutation, useCreateProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders
  const { data: products, isLoading, refetch } = useGetProductsQuery();

  const [createProduct] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();

  const handleCreateProduct = async () => {
    if (window.confirm('Are you sure you want to create a new dummy product?')) {
      try {
        await createProduct();
        toast.success('Product created successfully');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    // Allow multiple files mapping
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('images', e.target.files[i]);
    }

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success('Images uploaded directly to Cloudinary!');
      console.log('Uploaded files structure:', res);
      // Expected: [{url: 'https://res.cloudinary...', public_id: '...'}]
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="bg-honeycomb min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brown-950 font-['Playfair_Display']">
            Admin Control Panel
          </h1>
          <div className="flex gap-4">
            <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'overview' ? 'bg-brown-900 text-white' : 'bg-white text-brown-700 border border-honey-200 hover:bg-honey-50'}`}>Overview</button>
            <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'products' ? 'bg-brown-900 text-white' : 'bg-white text-brown-700 border border-honey-200 hover:bg-honey-50'}`}>Products</button>
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === 'orders' ? 'bg-brown-900 text-white' : 'bg-white text-brown-700 border border-honey-200 hover:bg-honey-50'}`}>Orders</button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="glass-card p-6 flex items-center gap-4 bg-white border-l-4 border-honey-500">
                <div className="w-12 h-12 rounded-full bg-honey-100 flex items-center justify-center text-honey-600 shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-500 uppercase tracking-wider">Total Sales</p>
                  <p className="text-2xl font-bold text-brown-950">₹1,24,500</p>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-4 bg-white border-l-4 border-brown-500">
                <div className="w-12 h-12 rounded-full bg-brown-100 flex items-center justify-center text-brown-600 shrink-0">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-500 uppercase tracking-wider">Total Orders</p>
                  <p className="text-2xl font-bold text-brown-950">156</p>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-4 bg-white border-l-4 border-honey-500">
                <div className="w-12 h-12 rounded-full bg-honey-100 flex items-center justify-center text-honey-600 shrink-0">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-500 uppercase tracking-wider">Products</p>
                  <p className="text-2xl font-bold text-brown-950">{products ? products.length : '...'}</p>
                </div>
              </div>

              <div className="glass-card p-6 flex items-center gap-4 bg-white border-l-4 border-brown-500">
                <div className="w-12 h-12 rounded-full bg-brown-100 flex items-center justify-center text-brown-600 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-500 uppercase tracking-wider">Customers</p>
                  <p className="text-2xl font-bold text-brown-950">89</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders Overview */}
              <div className="lg:col-span-2 glass-card bg-white shadow-sm border border-honey-100 rounded-2xl overflow-hidden">
                <div className="px-6 py-5 border-b border-honey-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="text-lg font-bold text-brown-950 font-['Playfair_Display']">Recent Orders</h2>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-honey-600 font-semibold hover:text-honey-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-honey-100 text-xs uppercase tracking-wider text-brown-500">
                        <th className="p-4 font-semibold">Order ID</th>
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-honey-50 text-sm">
                      {/* Placeholder for fetching orders */}
                      <tr className="hover:bg-honey-50/30 transition-colors">
                        <td className="p-4 font-medium text-brown-900">#ORD-9021</td>
                        <td className="p-4 text-brown-500">Oct 24, 2026</td>
                        <td className="p-4"><span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">Processing</span></td>
                        <td className="p-4 font-bold text-brown-900">₹1,450</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Actions / Activity */}
              <div className="glass-card bg-white shadow-sm border border-honey-100 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-brown-950 font-['Playfair_Display'] mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-honey-500" /> Recent Activity
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-brown-900">New order received #ORD-9021</p>
                      <p className="text-xs text-brown-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-honey-100">
                  <button onClick={() => setActiveTab('products')} className="w-full btn-secondary text-sm mb-3">Manage Products</button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <div className="glass-card bg-white p-6 rounded-2xl shadow-sm border border-honey-100 min-h-[60vh] animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-brown-900">Product Management</h2>
              <div className="flex gap-4">
                <div className="relative overflow-hidden w-full md:w-auto">
                  <button disabled={isUploading} className="btn-secondary px-4 py-2 flex items-center gap-2 whitespace-nowrap">
                    {isUploading ? 'Uploading...' : <><ImagePlus className="w-4 h-4" /> Upload to Cloudinary</>}
                  </button>
                  <input
                    type="file"
                    multiple
                    onChange={uploadFileHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    title="Upload directly to Cloudinary"
                  />
                </div>
                <button onClick={handleCreateProduct} className="btn-primary px-4 py-2 flex items-center gap-2 whitespace-nowrap">
                  + Create Dummy Product
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center p-12"><div className="w-12 h-12 border-4 border-honey-200 border-t-honey-500 rounded-full animate-spin"></div></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-honey-100">
                  <thead>
                    <tr className="bg-gray-50 border-b border-honey-100 text-sm tracking-wider text-brown-700">
                      <th className="p-4 font-semibold">ID</th>
                      <th className="p-4 font-semibold">NAME</th>
                      <th className="p-4 font-semibold">PRICE</th>
                      <th className="p-4 font-semibold">CATEGORY</th>
                      <th className="p-4 font-semibold">ACTIVE</th>
                      <th className="p-4 font-semibold text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-honey-50 text-sm">
                    {products?.map((product) => (
                      <tr key={product._id} className="hover:bg-honey-50/30 transition-colors">
                        <td className="p-4 text-brown-500 font-mono text-xs">{product._id.substring(0, 10)}...</td>
                        <td className="p-4 font-medium text-brown-900">{product.name}</td>
                        <td className="p-4 text-brown-700">₹{product.price}</td>
                        <td className="p-4 text-brown-700">{product.category}</td>
                        <td className="p-4">
                          {product.isActive ? (
                            <span className="text-green-600 bg-green-50 px-2.5 py-1 rounded-md text-xs font-semibold">Yes</span>
                          ) : (
                            <span className="text-red-600 bg-red-50 px-2.5 py-1 rounded-md text-xs font-semibold">No</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg"><Edit className="w-4 h-4" /></button>
                            <button className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass-card bg-white p-6 rounded-2xl shadow-sm border border-honey-100 min-h-[60vh] animate-fade-in flex items-center justify-center">
            <div className="text-center">
              <Package className="w-16 h-16 text-honey-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-brown-900 mb-2">Order Management</h2>
              <p className="text-brown-500 max-w-md mx-auto">Connect the `useGetOrdersQuery` here to list all placed orders and allow admins to mark them as shipped or delivered.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
