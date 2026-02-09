import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import CartContext from '../context/CartContext'; // Assuming CartContext is exported as default or named
import { Search, ShoppingBag, ArrowRight, Star, Filter, Heart, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient'; // Ensure correct path

export const Products = () => {
    const { state, dispatch } = useContext(ProductContext);
    const { addItem } = useContext(CartContext) || {};
    const { keyword } = useParams();
    const navigate = useNavigate();
    const [localSearch, setLocalSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [featuredProduct, setFeaturedProduct] = useState(null);

    // Floating animation for hero product
    const floatAnimation = {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    useEffect(() => {
        // Check if products are loaded
        if (state.products.length > 0) {
            setFeaturedProduct(state.products.find(p => p.title.includes("LunaStep")) || state.products[0]);
        }
    }, [state.products]);

    // Sync URL keyword with Context Search Query
    useEffect(() => {
        if (keyword) {
            dispatch({ type: "SET_QUERY", payload: keyword });
            // Only update localSearch if it's different to avoid cursor jumping issues if we were to typing
            // But actually, we want localSearch to drive the URL, so we don't necessarily want to reverse-sync 
            // from URL to localSearch unless it's the initial load or back/forward navigation.
            // A simple way is to check if localSearch is empty (initial load)
            if (!localSearch) setLocalSearch(keyword);
        } else {
            dispatch({ type: "SET_QUERY", payload: "" });
            if (!localSearch && keyword === undefined) setLocalSearch("");
        }
    }, [keyword, dispatch]);


    const handleSearch = (e) => {
        e.preventDefault();
        // The effect will handle the navigation, so we just prevent default
    };

    const categories = ["All", "Running", "Walking", "Skate", "Casual"];

    const filteredProducts = activeCategory === "all" || activeCategory === "All"
        ? state.products
        : state.products.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());

    if (state.loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-[#F8F9FA]">
            <div className="text-2xl font-black text-gray-300 animate-pulse">LOADING...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-blue-600 selection:text-white pb-20 overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-20">
                {/* Background Radial Gradient */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] bg-linear-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -z-10 animate-pulse" />

                <div className="text-center z-10 max-w-5xl mx-auto space-y-8 relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-9xl font-black tracking-tighter text-[#1A1A1A] leading-none"
                    >
                        Walk on Air.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto font-medium leading-relaxed"
                    >
                        Engineered for elegance. Designed for the everyday. <br className="hidden md:block" />
                        Experience the weightless comfort of <span className="text-black font-bold">LunaStep Air</span>.
                    </motion.p>
                </div>

                {/* Hero Shoe Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, type: "spring" }}
                    className="relative mt-12 mb-12 hover:scale-105 transition-transform duration-500 cursor-pointer z-10"
                >
                    {/* Using a placeholder or the actual hero image from design if available via URL, otherwise logical fallback */}
                    <motion.img
                        src="https://s.yimg.com/ny/api/res/1.2/.poahHt.fSN4C6.b0SRm8w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTIwNDg7aD0xMzY2O2NmPXdlYnA-/https://media.zenfs.com/en/footwear_news_642/9d6fc4a8f1253f353ade16bf5d685e43"
                        alt="LunaStep Air"
                        className="w-[300px] md:w-[600px] object-contain drop-shadow-2xl translate-y-6"
                        animate={floatAnimation}
                    />

                    {/* Decorative Elements behind shoe */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[650px] md:h-[650px] border border-gray-200 rounded-full -z-10 opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[900px] md:h-[900px] border border-dashed border-gray-300 rounded-full -z-10 opacity-30 animate-[spin_60s_linear_infinite]" />
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 items-center z-10"
                >
                    <button className="bg-[#1A1A90] text-white px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-blue-800 hover:scale-105 hover:shadow-xl transition-all flex items-center gap-3 shadow-lg shadow-blue-900/20">
                        Shop LunaStep Air <ArrowRight size={18} />
                    </button>
                    <button className="bg-white text-black border border-gray-200 px-10 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:border-black hover:bg-gray-50 transition-all flex items-center gap-2">
                        <Play size={16} className="fill-black" /> Watch the Film
                    </button>
                </motion.div>
            </section>

            {/* Featured Collections */}
            <section className="max-w-[1400px] mx-auto px-6 py-20">
                <h2 className="text-4xl md:text-5xl font-black mb-12 text-[#1A1A1A] tracking-tight">Featured Collections</h2>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">

                    {/* Large Card - Urban Runner */}
                    <div className="md:col-span-8 relative rounded-[2.5rem] overflow-hidden group min-h-[400px] md:min-h-[600px] shadow-sm hover:shadow-2xl transition-all duration-500">
                        <img
                            src="https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_900,h_900/global/312706/01/sv01/fnd/IND/fmt/png/Softride-Premier-GlideKnit-Walking-Shoes"
                            alt="Urban Runner"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.85]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-0 left-0 p-8 md:p-14 text-white max-w-2xl">
                            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4 block text-blue-300">New Release</span>
                            <h3 className="text-4xl md:text-6xl font-black mb-4 leading-none">Urban Runner Series</h3>
                            <p className="text-sm md:text-base text-gray-200 mb-8 leading-relaxed max-w-lg">Performance meets street style. Built for the concrete jungle with advanced grip technology and responsive cushioning.</p>
                            <button className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border-b-2 border-white pb-2 hover:text-blue-300 hover:border-blue-300 transition-colors flex items-center gap-2 group/btn">
                                Explore Collection <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col gap-6">
                        {/* Top Right - Custom Studio */}
                        <div className="flex-1 min-h-[300px] rounded-[2.5rem] bg-white border border-gray-100 p-10 flex flex-col items-center justify-center text-center hover:shadow-2xl hover:border-blue-100 transition-all cursor-pointer group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-blue-500 to-purple-500" />
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm">
                                <ShoppingBag size={28} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-[#1A1A1A]">Cart</h3>
                            <p className="text-sm text-gray-500 mb-8 max-w-[220px] leading-relaxed">See Your Air</p>
                            <button className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-all">Mine AIR</button>
                        </div>

                        {/* Bottom Right - Midnight Edition */}
                        <div className="flex-1 min-h-[300px] relative rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000"
                                alt="Midnight"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-10 text-white w-full">
                                <h3 className="text-2xl font-bold mb-1">Midnight Edition</h3>
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Stealth mode activated.</p>
                            </div>
                            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                <ArrowRight className="text-white" size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Product Grid (from Supabase) */}
            <section className="max-w-[1400px] mx-auto px-6 mb-20 md:mb-40">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-4xl font-black text-[#1A1A1A] mb-2">All Products</h2>
                        <p className="text-gray-400 font-medium">{filteredProducts.length} premium items found</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:items-center w-full md:w-auto">
                        <form onSubmit={handleSearch} className="relative flex-1 min-w-[250px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-[#1A1A1A] focus:ring-1 focus:ring-[#1A1A1A] transition-all placeholder:text-gray-300 font-bold text-sm"
                            />
                        </form>

                        <div className="flex flex-wrap gap-3">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${activeCategory === cat
                                        ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-lg scale-105"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-[2.5rem] p-6 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-100 relative flex flex-col items-center text-center"
                            >
                                <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="bg-white shadow-sm p-3 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors border border-gray-100">
                                        <Heart size={18} />
                                    </button>
                                </div>

                                <div className="w-full aspect-4/3 mb-8 overflow-hidden rounded-4xl bg-[#F8F9FA] flex items-center justify-center p-4 ">
                                    <img
                                        src={product.image_url || product.images?.[0] || product.thumbnail || "https://via.placeholder.com/300"}
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out "
                                    />
                                </div>

                                <div className="w-full text-left px-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">{product.brand}</p>
                                    <h3 className="font-bold text-xl mb-2 text-[#1A1A1A] leading-tight min-h-12 line-clamp-2">{product.title}</h3>

                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < Math.round(product.rating || 4.5) ? "currentColor" : "none"} className={i < Math.round(product.rating || 4.5) ? "" : "text-gray-300"} />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">({product.rating || 4.5})</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                        <span className="text-2xl font-black text-[#1A1A1A]">${product.price}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addItem && addItem(product); }}
                                            className="bg-[#1A1A1A] text-white p-4 rounded-full hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 group-hover:scale-110"
                                        >
                                            <ShoppingBag size={20} strokeWidth={2} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="max-w-7xl mx-auto px-6 py-20 bg-white rounded-[4rem] text-center my-20 shadow-sm border border-gray-100">
                <div className="max-w-4xl mx-auto">
                    <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.3em] mb-8 animate-pulse">The LunaStep Philosophy</p>
                    <h2 className="text-3xl md:text-6xl font-black leading-tight mb-20 text-[#1A1A1A] tracking-tight">
                        "We believe a shoe isn’t just an accessory. It’s the foundation of your journey."
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12 text-left">
                        <div className="p-8 rounded-3xl hover:bg-[#F8F9FA] transition-all duration-500 group">
                            <div className="w-14 h-14 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mb-6 group-hover:rotate-12 transition-transform duration-500">
                                <ShoppingBag size={24} strokeWidth={2} />
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-[#1A1A1A]">Sustainable Core</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Made with 100% recycled ocean plastics and organic cotton blends. Good for you, good for the planet.</p>
                        </div>
                        <div className="p-8 rounded-3xl hover:bg-[#F8F9FA] transition-all duration-500 group">
                            <div className="w-14 h-14 bg-purple-50 rounded-3xl flex items-center justify-center text-purple-600 mb-6 group-hover:-rotate-12 transition-transform duration-500">
                                <Star size={24} strokeWidth={2} />
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-[#1A1A1A]">Precision Fit</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Laser-scanned ergonomics ensure a fit that feels customized to you. No break-in period required.</p>
                        </div>
                        <div className="p-8 rounded-3xl hover:bg-[#F8F9FA] transition-all duration-500 group">
                            <div className="w-14 h-14 bg-green-50 rounded-3xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Filter size={24} strokeWidth={2} />
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-[#1A1A1A]">Built to Last</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Durable materials rigorously tested for 500+ miles of wear in the most demanding conditions.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
