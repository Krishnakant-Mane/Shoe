import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import CartContext from '../context/CartContext'; // Assuming CartContext is exported as default or named
import { Search, ShoppingBag, ArrowRight, Star, Filter, Heart, Play, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from './supabaseClient'; // Ensure correct path

export const Products = () => {
    const { state, dispatch } = useContext(ProductContext);
    const { addItem } = useContext(CartContext) || {};
    const navigate = useNavigate();

    // Local state for immediate input feedback without route updates
    const [localSearch, setLocalSearch] = useState("");

    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
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

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is handled via onChange updating URL params directly
    };

    const categories = ["All", "Running", "Walking", "Skate", "Casual"];

    const filteredProducts = useMemo(() => {
        let products = [...state.products];

        // Filter by Category
        if (activeCategory !== "All") {
            products = products.filter(p => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());
        }

        // Filter by Search Query
        if (localSearch) {
            const lowerQuery = localSearch.toLowerCase();
            products = products.filter(p =>
                p.title.toLowerCase().includes(lowerQuery) ||
                (p.description && p.description.toLowerCase().includes(lowerQuery)) ||
                (p.brand && p.brand.toLowerCase().includes(lowerQuery))
            );
        }

        // Sort by Newest (modified time)
        if (sortBy === "Newest") {
            products.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
        }

        return products;
    }, [state.products, activeCategory, localSearch, sortBy]);

    if (state.loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-[#F8F9FA]">
            <div className="text-2xl font-black text-gray-300 animate-pulse">LOADING...</div>
        </div>
    );

    return (
        <div id="products" className="pt-32 min-h-screen bg-white text-[#1A1A1A] font-sans selection:bg-black selection:text-white pb-20 overflow-x-hidden">
            {/* Introduction Section */}
            <section className="max-w-[1400px] mx-auto px-6 mb-16">
                <h1 className="text-7xl font-light tracking-tight text-[#1A1A1A] mb-6">The Collection</h1>
                <p className="max-w-2xl text-gray-500 text-lg leading-relaxed">
                    Engineered for movement. Designed for life. Explore our comprehensive lineup of premium footwear built for the modern journey.
                </p>
            </section>

            {/* Filter Bar */}
            <section className="max-w-[1400px] mx-auto px-6 mb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative group min-w-[240px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search collection..."
                                value={localSearch}
                                onChange={(e) => setLocalSearch(e.target.value)}
                                className="w-full bg-[#F3F4F6] border-none rounded-full py-2.5 pl-11 pr-5 text-sm font-medium focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Filters Container */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSortBy(sortBy === "Newest" ? "Default" : "Newest")}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${sortBy === "Newest" ? "bg-black text-white" : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"}`}
                            >
                                Sort by: {sortBy}
                                <ChevronDown size={14} />
                            </button>
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? "bg-black text-white" : "bg-[#F3F4F6] text-gray-700 hover:bg-gray-200"}`}
                                >
                                    {cat}
                                    {cat === "Category" || cat === "Size" || cat === "Color" ? <ChevronDown size={14} /> : null}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                        Showing {filteredProducts.length} Results
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="max-w-[1400px] mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group cursor-pointer"
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                {/* Product Image Container */}
                                <div className="relative aspect-4/5 mb-6 bg-[#F3F4F6] rounded-2xl overflow-hidden flex items-center justify-center p-8">
                                    {(product.isNew || product.brand === "Nike") && (
                                        <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider uppercase">
                                            New Release
                                        </div>
                                    )}
                                    <img
                                        src={product.image_url || product.images?.[0] || product.thumbnail || "https://via.placeholder.com/300"}
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="space-y-1">
                                    <div className="flex items-start justify-between">
                                        <h3 className="font-bold text-lg text-[#1A1A1A] leading-tight flex-1">{product.title}</h3>
                                        <span className="text-gray-400 font-medium ml-4">${product.price}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm font-medium">{product.category || "Performance Running"}</p>

                                    {/* Color Swatches (Placeholder logic) */}
                                    <div className="flex gap-1.5 pt-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Load More Button */}
            <div className="flex justify-center pb-20">
                <button className="bg-[#111827] text-white px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-black transition-colors shadow-lg">
                    Load More Products
                </button>
            </div>

        </div>
    )
}
