import React, { useContext, useMemo } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Star, Tag, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CartContext from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

export const Carts = () => {
    const { items, removeItem, updateQuantity, addItem } = useContext(CartContext) || {};
    const { state: productState } = useContext(ProductContext) || { state: { products: [] } };

    // Calculations
    const subtotal = useMemo(() => {
        return items?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;
    }, [items]);

    const shipping = subtotal > 500 ? 0 : 15; // Free shipping over $500
    const taxRate = 0.08;
    const estimatedTax = subtotal * taxRate;
    const total = subtotal + shipping + estimatedTax;

    // Recommendations Logic
    // Get products from categories present in the cart, excluding items already in cart
    const recommendations = useMemo(() => {
        if (!productState.products || productState.products.length === 0) return [];

        const cartProductIds = new Set(items?.map(item => item.product.id) || []);
        const cartCategories = new Set(items?.map(item => item.product.category?.toLowerCase()) || []);

        let filtered = productState.products.filter(p => !cartProductIds.has(p.id));

        // Prioritize same categories
        let matching = filtered.filter(p => cartCategories.has(p.category?.toLowerCase()));

        // If not enough matches, fill with others
        if (matching.length < 4) {
            const others = filtered.filter(p => !cartCategories.has(p.category?.toLowerCase()));
            matching = [...matching, ...others].slice(0, 10);
        }

        return matching.slice(0, 8);
    }, [productState.products, items]);

    if (!items || items.length === 0) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-20 flex flex-col items-center justify-center px-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-8">
                    <ShoppingBag size={40} />
                </div>
                <h2 className="text-3xl font-black text-[#1A1A1A] mb-4">Your bag is empty</h2>
                <p className="text-gray-400 font-medium mb-12 text-center max-w-md">Items you add to your bag will show up here. Explore our collection to find your perfect pair.</p>
                <Link to="/products">
                    <button className="bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-blue-600 transition-all shadow-xl shadow-black/5 hover:scale-105">
                        Start Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans pt-32 pb-20 px-6 overflow-x-hidden">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Cart Items Section */}
                    <div className="flex-1">
                        <div className="mb-10">
                            <h1 className="text-5xl font-black mb-2">Your Bag</h1>
                            <p className="text-gray-400 font-medium tracking-wide">Review your selection before checkout.</p>
                        </div>

                        <div className="space-y-8">
                            <AnimatePresence mode="popLayout">
                                {items.map((item) => (
                                    <motion.div
                                        key={item.product.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col sm:flex-row items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all group"
                                    >
                                        {/* Product Image */}
                                        <div className="w-40 h-40 bg-[#F8F9FA] rounded-4xl flex items-center justify-center p-4 overflow-hidden">
                                            <img
                                                src={item.product.image_url || item.product.images?.[0] || "https://via.placeholder.com/300"}
                                                alt={item.product.title}
                                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 w-full sm:w-auto">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2">
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-1 leading-tight">{item.product.title}</h3>
                                                    <p className="text-gray-400 font-medium text-sm mb-4">{item.product.brand || 'Premium Edition'}</p>

                                                    <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-300">Size:</span>
                                                            <span className="text-gray-600">10.5</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-300">Style:</span>
                                                            <span className="text-gray-600">Performance</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-2xl font-black">${item.product.price.toFixed(2)}</div>
                                            </div>

                                            <div className="flex items-center justify-between mt-8">
                                                <div className="flex items-center bg-[#F8F9FA] rounded-full p-1 border border-gray-100">
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-[#1A1A1A]"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm transition-all text-gray-400 hover:text-[#1A1A1A]"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.product.id)}
                                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="w-full lg:w-[450px] space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)]">
                            <h2 className="text-2xl font-black mb-8">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm font-medium text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-gray-400">
                                    <span>Estimated Shipping</span>
                                    <span className="text-[#1A1A1A]">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-gray-400">
                                    <span>Estimated Tax</span>
                                    <span className="text-[#1A1A1A]">${estimatedTax.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 mb-10">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="text-4xl font-black text-blue-600">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <button className="w-full bg-[#1A1A1A] text-white py-6 rounded-3xl font-bold flex items-center justify-center gap-2 group hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 transition-all duration-500">
                                    <span>Checkout</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="w-full bg-purple-50 text-purple-600 py-6 rounded-3xl font-bold hover:bg-purple-100 transition-all duration-300">
                                    Pay with Apple Pay
                                </button>
                            </div>

                            <p className="text-[10px] text-gray-400 font-medium text-center mt-10 leading-relaxed max-w-[280px] mx-auto">
                                By proceeding to checkout, you agree to LunaStep's Terms of Service and Privacy Policy.
                            </p>
                        </div>

                        {/* Promo Code Box */}
                        <div className="bg-white p-8 rounded-4xl border border-gray-100">
                            <h3 className="font-bold mb-4 text-sm">Add Promo Code</h3>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                                    <input
                                        type="text"
                                        placeholder="LUNA20"
                                        className="w-full bg-[#F8F9FA] rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
                                    />
                                </div>
                                <button className="px-6 py-4 bg-gray-100 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors">Apply</button>
                            </div>
                        </div>

                        {/* Support Box */}
                        <div className="bg-blue-50/30 border border-blue-100/50 p-8 rounded-4xl flex gap-5">
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/20">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1 text-blue-900">Need help?</h4>
                                <p className="text-xs text-blue-800/60 font-medium leading-relaxed">
                                    Contact our premium support 24/7 for sizing and shipping assistance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations Section */}
                <div className="mt-32">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black">Recommended for You</h2>
                        <div className="flex gap-4">
                            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all">
                                <ChevronLeft size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-all">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recommendations.map(product => (
                            <motion.div
                                key={product.id}
                                whileHover={{ y: -10 }}
                                className="group bg-white p-6 rounded-[2.5rem] border border-transparent hover:border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all cursor-pointer"
                            >
                                <div className="aspect-4/5 bg-[#F8F9FA] rounded-4xl flex items-center justify-center p-6 mb-6 overflow-hidden relative">
                                    <img
                                        src={product.image_url || product.images?.[0] || "https://via.placeholder.com/300"}
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); addItem(product); }}
                                        className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 hover:bg-blue-600 hover:text-white"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <h4 className="font-bold text-lg mb-1 line-clamp-1">{product.title}</h4>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="font-black text-xl text-[#1A1A1A]">${product.price}</span>
                                    <div className="flex items-center gap-1">
                                        <Star size={12} fill="#FFD700" className="text-[#FFD700]" />
                                        <span className="text-[10px] font-bold text-gray-400">4.9</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
