import React, { useContext, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import CartContext from '../context/CartContext';
import { Star, Heart, ShoppingBag, ChevronDown, ShieldCheck, Truck, RefreshCw, Ruler, Zap, Disc, Wind, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useContext(ProductContext);
    const { addItem } = useContext(CartContext) || {};

    const [selectedSize, setSelectedSize] = useState("US 9");
    const [selectedColor, setSelectedColor] = useState("Midnight Black");

    const product = useMemo(() => {
        return state.products.find(p => String(p.id) === String(id));
    }, [state.products, id]);

    if (!product) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <div className="text-xl font-medium text-gray-400 mb-4">Product not found</div>
                <button
                    onClick={() => navigate('/products')}
                    className="text-black font-bold underline"
                >
                    Back to Collection
                </button>
            </div>
        );
    }

    const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "US 13"];
    const colors = [
        { name: "Midnight Black", class: "bg-zinc-900" },
        { name: "Cloud Gray", class: "bg-zinc-200" },
        { name: "Cobalt Blue", class: "bg-blue-700" }
    ];

    const techSpecs = [
        { icon: <Zap size={20} />, label: "WEIGHT", value: "210g (Men's 9)" },
        { icon: <Disc size={20} />, label: "HEEL DROP", value: "8mm Offset" },
        { icon: <Wind size={20} />, label: "MATERIAL", value: "Recycled Fly-knit" },
        { icon: <Layers size={20} />, label: "CUSHIONING", value: "LunaCore™ Foam" }
    ];

    const styleGallery = [
        { tag: "Running", title: "The Morning Sprinter", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600" },
        { tag: "Casual", title: "Casual Friday", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600" },
        { tag: "Adventure", title: "Weekend Explorer", img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=600" },
        { tag: "Gym", title: "Gym Session", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600" }
    ];

    const handleAddToBag = () => {
        if (addItem) {
            addItem({ ...product, selectedSize, selectedColor });
            toast.success(`${product.title} added to bag!`, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }
    };

    return (
        <div className="pt-32 pb-20 bg-white min-h-screen font-sans selection:bg-black selection:text-white">
            <div className="max-w-[1400px] mx-auto px-6">
                {/* Product Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

                    {/* Left: Image Gallery */}
                    <div className="space-y-6">
                        <div className="relative aspect-[1.2/1] bg-[#F3F4F6] rounded-3xl overflow-hidden flex items-center justify-center p-12">
                            {(product.isNew || product.brand === "Nike") && (
                                <div className="absolute top-8 left-8 bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-sm tracking-widest uppercase z-10">
                                    New Release
                                </div>
                            )}
                            <motion.img
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={product.image_url || "https://via.placeholder.com/600"}
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="aspect-square bg-[#F3F4F6] rounded-3xl overflow-hidden p-8">
                                <img src={product.image_url} alt="detail 1" className="w-full h-full object-contain mix-blend-multiply opacity-60" />
                            </div>
                            <div className="aspect-square bg-[#F3F4F6] rounded-3xl overflow-hidden p-8">
                                <img src={product.image_url} alt="detail 2" className="w-full h-full object-contain mix-blend-multiply opacity-30 grayscale" />
                            </div>
                        </div>

                        <div className="aspect-[1.8/1] bg-[#F3F4F6] rounded-3xl overflow-hidden relative">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000"
                                alt="lifestyle"
                                className="w-full h-full object-cover grayscale opacity-80"
                            />
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-5xl font-light tracking-tight text-[#1A1A1A] mb-2">{product.title}</h1>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-medium">${product.price}.00</span>
                                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">In Stock</span>
                                </div>
                            </div>
                            <button className="p-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors">
                                <Heart size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-8">
                            <div className="flex text-black">
                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                            </div>
                            <span className="text-xs font-medium text-gray-400">(1,248 Reviews)</span>
                        </div>

                        <p className="text-gray-500 leading-relaxed mb-10 text-lg max-w-xl">
                            {product.description || "Engineered for the urban sprinter. The Velocity Air combines aerospace-grade mesh with our signature LunaCore foam for weightless propulsion. Experience energy return like never before."}
                        </p>

                        {/* Color Selection */}
                        <div className="mb-10">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Color: {selectedColor}</h4>
                            <div className="flex gap-4">
                                {colors.map(color => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full ${color.class} p-1 border-2 transition-all ${selectedColor === color.name ? "border-black scale-110" : "border-transparent"}`}
                                    >
                                        <div className="w-full h-full rounded-full border border-white/20" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-12">
                            <div className="flex justify-between mb-4">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Select Size</h4>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] underline">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-4 gap-3">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-4 rounded-xl text-sm font-medium border transition-all ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-4 mb-16">
                            <button
                                onClick={handleAddToBag}
                                className="w-full bg-[#111827] text-white py-6 rounded-2xl font-bold tracking-wide flex items-center justify-center gap-3 hover:bg-black transition-all transform active:scale-[0.98]"
                            >
                                <ShoppingBag size={20} />
                                Add to Bag
                            </button>
                            <p className="text-center text-[10px] text-gray-400 font-medium">Free shipping on orders over $150. 30-day returns.</p>
                        </div>

                        {/* Collapsible Info */}
                        <div className="border-t border-gray-100 divide-y divide-gray-100">
                            {["Product Features", "Shipping & Returns"].map(item => (
                                <button key={item} className="w-full py-6 flex justify-between items-center group">
                                    <span className="text-sm font-bold text-gray-700 group-hover:text-black transition-colors">{item}</span>
                                    <ChevronDown size={18} className="text-gray-400 group-hover:text-black transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                <section className="mb-32">
                    <h2 className="text-3xl font-light mb-2">Technical Specifications</h2>
                    <p className="text-gray-400 text-sm mb-12">Designed with precision for maximum performance.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {techSpecs.map((spec, i) => (
                            <div key={i} className="bg-[#F8F9FA] p-10 rounded-3xl space-y-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black">
                                    {spec.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">{spec.label}</p>
                                    <p className="font-bold text-lg">{spec.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Style It Your Way */}
                <section>
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-light mb-2">Style It Your Way</h2>
                            <p className="text-gray-400 text-sm">Versatile looks for every occasion.</p>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors">
                                <ChevronDown size={20} className="rotate-90" />
                            </button>
                            <button className="p-3 rounded-full border border-gray-100 hover:bg-gray-50 transition-colors">
                                <ChevronDown size={20} className="-rotate-90" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {styleGallery.map((item, i) => (
                            <div key={i} className="space-y-4 group cursor-pointer">
                                <div className="aspect-3/4 rounded-3xl overflow-hidden bg-gray-100 relative">
                                    <div className="absolute top-6 left-6 z-10">
                                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{item.tag}</span>
                                        </div>
                                    </div>
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">Versatile for any activity. Pair with our latest apparel for the full look.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
