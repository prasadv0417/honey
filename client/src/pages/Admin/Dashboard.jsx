import React, { useState, useEffect } from 'react';
import {
  Package, ShoppingBag, Users, DollarSign, Activity,
  ImagePlus, Edit, Trash2, X, ChevronDown, Check
} from 'lucide-react';
import {
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

// ─── Product Edit Modal ─────────────────────────────────────────────────────
const ProductEditModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || '',
    ingredients: product?.ingredients || '',
    healthBenefits: product?.healthBenefits?.join(', ') || '',
    isActive: product?.isActive ?? true,
    sizes: product?.sizes || [{ size: '250g', price: 0, stock: 0 }],
    images: product?.images || [],
  });

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadProductImageMutation();

  const handleSizeChange = (index, field, value) => {
    const sizes = [...form.sizes];
    sizes[index] = { ...sizes[index], [field]: field === 'size' ? value : Number(value) };
    setForm({ ...form, sizes });
  };

  const addSize = () => setForm({ ...form, sizes: [...form.sizes, { size: '', price: 0, stock: 0 }] });
  const removeSize = (i) => setForm({ ...form, sizes: form.sizes.filter((_, idx) => idx !== i) });

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    for (let file of e.target.files) formData.append('images', file);
    try {
      const uploaded = await uploadImage(formData).unwrap();
      setForm({ ...form, images: [...form.images, ...uploaded] });
      toast.success(`${uploaded.length} image(s) uploaded to Cloudinary`);
    } catch (err) {
      toast.error(err?.data?.message || 'Upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId: product._id,
        ...form,
        healthBenefits: form.healthBenefits.split(',').map(s => s.trim()).filter(Boolean),
      }).unwrap();
      toast.success('Product updated!');
      onSave();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8 animate-fade-in">
        <div className="flex justify-between items-center p-6 border-b border-honey-100">
          <h2 className="text-xl font-bold text-brown-900 font-['Playfair_Display']">
            {product._id ? 'Edit Product' : 'Create Product'}
          </h2>
          <button onClick={onClose} className="text-brown-400 hover:text-brown-700 p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-brown-700">Product Name *</label>
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-brown-700">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none">
                <option>Raw Honey</option>
                <option>Herbal Honey</option>
                <option>Medicinal Honey</option>
                <option>Premium Honey</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-brown-700">Description *</label>
              <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
                className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none resize-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-brown-700">Base Price (₹)</label>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium text-brown-700">Ingredients</label>
              <input value={form.ingredients} onChange={e => setForm({ ...form, ingredients: e.target.value })}
                className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-brown-700">Health Benefits (comma-separated)</label>
              <input value={form.healthBenefits} onChange={e => setForm({ ...form, healthBenefits: e.target.value })}
                placeholder="Boosts Immunity, Rich in Antioxidants, ..."
                className="mt-1 w-full px-4 py-2 border border-honey-200 rounded-lg focus:ring-2 focus:ring-honey-500 outline-none" />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-brown-800">Size Variants</label>
              <button type="button" onClick={addSize} className="text-xs text-honey-600 bg-honey-50 px-3 py-1 rounded-lg hover:bg-honey-100">+ Add Size</button>
            </div>
            <div className="space-y-2">
              {form.sizes.map((s, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 items-center">
                  <input placeholder="250g" value={s.size} onChange={e => handleSizeChange(i, 'size', e.target.value)}
                    className="px-3 py-2 border border-honey-200 rounded-lg text-sm focus:ring-2 focus:ring-honey-500 outline-none col-span-1" />
                  <input type="number" placeholder="Price" value={s.price} onChange={e => handleSizeChange(i, 'price', e.target.value)}
                    className="px-3 py-2 border border-honey-200 rounded-lg text-sm focus:ring-2 focus:ring-honey-500 outline-none" />
                  <input type="number" placeholder="Stock" value={s.stock} onChange={e => handleSizeChange(i, 'stock', e.target.value)}
                    className="px-3 py-2 border border-honey-200 rounded-lg text-sm focus:ring-2 focus:ring-honey-500 outline-none" />
                  <button type="button" onClick={() => removeSize(i)} className="text-red-400 hover:text-red-600 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="text-sm font-semibold text-brown-800 block mb-2">Product Images</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-honey-200 group">
                  <img src={img.url || img} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) })}
                    className="absolute inset-0 bg-red-500/70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 border-2 border-dashed border-honey-300 rounded-lg flex flex-col items-center justify-center text-honey-500 hover:bg-honey-50 cursor-pointer transition">
                {isUploading ? <div className="w-5 h-5 border-2 border-honey-500 border-t-transparent rounded-full animate-spin" /> : <><ImagePlus className="w-6 h-6" /><span className="text-xs mt-1">Upload</span></>}
                <input type="file" multiple className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setForm({ ...form, isActive: !form.isActive })}
              className={`w-12 h-6 rounded-full transition-colors ${form.isActive ? 'bg-green-500' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${form.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className="text-sm font-medium text-brown-700">{form.isActive ? 'Active (visible in shop)' : 'Inactive (hidden from shop)'}</span>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-honey-100">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-honey-200 rounded-xl text-brown-700 hover:bg-honey-50 font-medium">Cancel</button>
            <button type="submit" disabled={isUpdating} className="btn-primary px-8 py-2">
              {isUpdating ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Dashboard ─────────────────────────────────────────────────────────
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProduct, setEditingProduct] = useState(null);

  const { data: products = [], isLoading: productsLoading, refetch: refetchProducts } = useGetProductsQuery();
  const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useGetAllOrdersQuery(undefined, { skip: activeTab === 'products' });
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product deleted');
        refetchProducts();
      } catch (err) {
        toast.error(err?.data?.message || 'Delete failed');
      }
    }
  };

  const handleCreateProduct = async () => {
    try {
      const newProduct = await createProduct({
        name: 'New Honey Product',
        description: 'Edit this product description',
        price: 499,
        sizes: [{ size: '500g', price: 499, stock: 50 }],
        stock: 50,
        images: [],
        category: 'Raw Honey',
      }).unwrap();
      toast.success('Draft product created — click Edit to update it');
      setEditingProduct(newProduct);
      refetchProducts();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus({ orderId, status }).unwrap();
      toast.success(`Order marked as ${status}`);
      refetchOrders();
    } catch (err) {
      toast.error(err?.data?.message || 'Status update failed');
    }
  };

  const statusBadge = {
    Processing: 'bg-blue-100 text-blue-700',
    Shipped: 'bg-yellow-100 text-yellow-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  const totalRevenue = orders.filter(o => o.orderStatus !== 'Cancelled').reduce((s, o) => s + o.totalPrice, 0);

  return (
    <div className="bg-honeycomb min-h-screen py-10">
      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={() => refetchProducts()}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-brown-950 font-['Playfair_Display']">Admin Control Panel</h1>
          <div className="flex gap-2 flex-wrap">
            {['overview', 'products', 'orders'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-colors ${activeTab === tab ? 'bg-brown-900 text-white' : 'bg-white text-brown-700 border border-honey-200 hover:bg-honey-50'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ─── OVERVIEW ─── */}
        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <DollarSign className="w-6 h-6" />, color: 'honey' },
                { label: 'Total Orders', value: orders.length, icon: <ShoppingBag className="w-6 h-6" />, color: 'brown' },
                { label: 'Products', value: products.length, icon: <Package className="w-6 h-6" />, color: 'honey' },
                { label: 'Pending Orders', value: orders.filter(o => o.orderStatus === 'Processing').length, icon: <Activity className="w-6 h-6" />, color: 'brown' },
              ].map((stat, i) => (
                <div key={i} className={`bg-white rounded-2xl shadow-sm border border-honey-100 p-6 flex items-center gap-4 border-l-4 border-l-${stat.color}-500`}>
                  <div className={`w-12 h-12 rounded-full bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600 shrink-0`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brown-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-brown-950">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders table on overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-honey-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-honey-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-bold text-brown-950 font-['Playfair_Display']">Recent Orders</h2>
                <button onClick={() => setActiveTab('orders')} className="text-sm text-honey-600 font-semibold hover:text-honey-700">View All →</button>
              </div>
              {ordersLoading ? <div className="p-8 flex justify-center"><Loader /></div> : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-honey-100">
                      <tr>
                        {['Order ID', 'Customer', 'Date', 'Status', 'Amount'].map(h => (
                          <th key={h} className="p-4 text-left font-semibold text-brown-600 text-xs uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-honey-50">
                      {orders.slice(0, 5).map(order => (
                        <tr key={order._id} className="hover:bg-honey-50/30 transition">
                          <td className="p-4 text-brown-500 font-mono text-xs">{order._id.slice(-8).toUpperCase()}</td>
                          <td className="p-4 text-brown-800 font-medium">{order.userId?.name || '—'}</td>
                          <td className="p-4 text-brown-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                          <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>{order.orderStatus}</span></td>
                          <td className="p-4 font-bold text-brown-900">₹{order.totalPrice}</td>
                        </tr>
                      ))}
                      {orders.length === 0 && <tr><td colSpan={5} className="text-center text-brown-400 py-10 italic">No orders yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ─── PRODUCTS ─── */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-honey-100 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-brown-900">Product Management</h2>
              <button onClick={handleCreateProduct} className="btn-primary px-5 py-2 flex items-center gap-2 whitespace-nowrap">
                + Add New Product
              </button>
            </div>

            {productsLoading ? <Loader /> : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-honey-100 text-xs uppercase text-brown-500 tracking-wider">
                      <th className="p-4">Image</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Sizes</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-honey-50 text-sm">
                    {products.map(product => {
                      const imgSrc = product.images?.[0]?.url || product.images?.[0] || null;
                      return (
                        <tr key={product._id} className="hover:bg-honey-50/30 transition-colors">
                          <td className="p-4">
                            {imgSrc ? (
                              <img src={imgSrc} alt={product.name} className="w-12 h-12 rounded-lg object-cover border border-honey-100" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-honey-100 flex items-center justify-center text-2xl">🍯</div>
                            )}
                          </td>
                          <td className="p-4 font-bold text-brown-900">{product.name}</td>
                          <td className="p-4 text-brown-600">{product.category}</td>
                          <td className="p-4 text-brown-600">
                            <div className="flex flex-wrap gap-1">
                              {product.sizes?.map((s, i) => (
                                <span key={i} className="text-xs bg-honey-100 text-brown-800 px-2 py-0.5 rounded-full">
                                  {s.size} – ₹{s.price} ({s.stock})
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-4">
                            {product.isActive
                              ? <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Active</span>
                              : <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">Hidden</span>}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => setEditingProduct(product)}
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition"><Edit className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteProduct(product._id)}
                                className="bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── ORDERS ─── */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-honey-100 animate-fade-in">
            <h2 className="text-2xl font-bold text-brown-900 mb-6">Order Management</h2>
            {ordersLoading ? <Loader /> : orders.length === 0 ? (
              <div className="text-center py-16 text-brown-400">
                <Package className="w-16 h-16 mx-auto mb-4 text-honey-200" />
                <p className="italic">No orders placed yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-honey-100 text-xs uppercase text-brown-500 tracking-wider">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-honey-50">
                    {orders.map(order => (
                      <tr key={order._id} className="hover:bg-honey-50/30 transition">
                        <td className="p-4 font-mono text-xs text-brown-500">{order._id.slice(-8).toUpperCase()}</td>
                        <td className="p-4 font-medium text-brown-900">{order.userId?.name || '—'}</td>
                        <td className="p-4 text-brown-500">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                        <td className="p-4 text-brown-600">{order.orderItems?.length} item(s)</td>
                        <td className="p-4 font-bold text-brown-900">₹{order.totalPrice}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadge[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className="text-xs border border-honey-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-honey-500 outline-none bg-white"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
