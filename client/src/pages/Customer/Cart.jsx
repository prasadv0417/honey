import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../slices/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems, itemsPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);

  // Admin should never be on the cart page
  useEffect(() => {
    if (userInfo?.role === 'admin') {
      navigate('/admin/dashboard');
    }
  }, [userInfo, navigate]);

  const updateQuantity = (item, qty) => {
    dispatch(addToCart({ ...item, quantity: qty }));
  };

  const removeFromCartHandler = (item) => {
    dispatch(removeFromCart(item));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center bg-honeycomb">
        <div className="w-24 h-24 bg-honey-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <ShoppingBag className="w-12 h-12 text-honey-500" />
        </div>
        <h2 className="text-3xl font-bold text-brown-950 mb-4 font-['Playfair_Display']">Your Cart is Empty</h2>
        <p className="text-brown-600 mb-8 max-w-md">Looks like you haven't added any of our delicious honey to your cart yet.</p>
        <Link to="/products" className="btn-primary px-8">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-honeycomb min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brown-950 font-['Playfair_Display'] mb-8">
          Shopping Cart ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="glass-card shadow-sm rounded-2xl overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-brown-900 border-b border-honey-200 text-sm font-semibold text-honey-50 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-honey-100 bg-white">
                {cartItems.map((item) => {
                  const imgSrc = item.image || item.images?.[0]?.url || item.images?.[0] || 'https://images.unsplash.com/photo-1587049352847-4d431cde70c2?auto=format&fit=crop&q=80&w=200';
                  return (
                    <div key={`${item._id}-${item.size}`} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center hover:bg-honey-50/50 transition-colors">
                      <div className="col-span-6 w-full flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm shrink-0 border border-honey-100">
                          <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <Link to={`/product/${item._id}`} className="text-lg font-bold text-brown-900 font-['Playfair_Display'] hover:text-honey-600 transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-sm text-brown-500 mt-1">Size: {item.size}</p>
                          <button
                            onClick={() => removeFromCartHandler(item)}
                            className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 mt-3 font-medium transition-colors"
                          >
                            <Trash2 className="w-4 h-4" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 w-full md:w-auto font-medium text-brown-900 md:text-center text-lg mt-4 md:mt-0">
                        <span className="md:hidden text-brown-500 text-sm mr-2">Price:</span>₹{item.price}
                      </div>

                      <div className="col-span-2 w-full md:w-auto flex justify-center mt-4 md:mt-0">
                        <div className="flex items-center border border-honey-200 rounded-lg bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => updateQuantity(item, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-3 py-1.5 text-brown-600 hover:bg-honey-100 transition-colors disabled:opacity-40"
                          >-</button>
                          <span className="w-10 text-center font-medium text-brown-900 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item, item.quantity + 1)}
                            className="px-3 py-1.5 text-brown-600 hover:bg-honey-100 transition-colors"
                          >+</button>
                        </div>
                      </div>

                      <div className="col-span-2 w-full md:w-auto text-right font-bold text-brown-950 text-xl mt-4 md:mt-0">
                        <span className="md:hidden text-brown-500 text-sm font-medium mr-2">Total:</span>₹{item.price * item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <Link to="/products" className="text-honey-600 hover:text-honey-700 font-medium flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="glass-card p-8 sticky top-28 bg-white border border-honey-200 shadow-xl">
              <h2 className="text-xl font-bold text-brown-950 font-['Playfair_Display'] border-b border-honey-200 pb-4 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-brown-700 mb-6">
                <div className="flex justify-between items-center text-lg">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brown-900">₹{itemsPrice}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span>Shipping</span>
                  <span className="font-semibold text-brown-900">
                    {Number(shippingPrice) === 0
                      ? <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded-full border border-green-200">Free</span>
                      : `₹${shippingPrice}`
                    }
                  </span>
                </div>
                {Number(shippingPrice) > 0 && (
                  <p className="text-xs text-honey-600 bg-honey-50 p-2 rounded-lg border border-honey-100">
                    Add ₹{(1000 - Number(itemsPrice)).toFixed(0)} more for free shipping!
                  </p>
                )}
              </div>

              <div className="border-t border-honey-200 pt-6 mb-8">
                <div className="flex justify-between items-center text-2xl font-bold text-brown-950">
                  <span>Total</span>
                  <span className="text-honey-600">₹{totalPrice}</span>
                </div>
                <p className="text-xs text-brown-500 text-right mt-1">Including GST</p>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-lg shadow-lg hover:shadow-xl py-4 flex items-center justify-center gap-3">
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
